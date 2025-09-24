import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import type { Invoice } from "@/interfaces/main";

// helpers
const money = (n: number | undefined) => `£${(n ?? 0).toFixed(2)}`;
const esc = (s?: string | number) =>
  String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// FULL template wired to your data
const buildInvoiceHTML = (inv: Invoice) => {
  const rows = (inv.labourItems ?? []).map(li => `
    <tr>
      <td>${esc(li.date)}</td>
      <td class="addr">${esc(li.siteLocation)}</td>
      <td class="desc">${esc(li.description || (li.taxFree ? "TAX free" : ""))}</td>
      <td class="w-qty">${esc(li.qty)}</td>
      <td class="w-money money">£${esc(li.rate)}</td>
      <td class="w-money money">${money(li.amount)}</td>
    </tr>
  `).join("");

  // Table total = all items (taxFree + taxable), like your example HTML shows
  const tableTotal = (inv.labourItems ?? []).reduce((a, b) => a + (b.amount ?? 0), 0);

  // Display fields (align with your HTML labels)
  const invoiceNo = inv.id ?? "";
  const weekEnding = inv.date ?? "";

  const emp = inv.employee ?? ({} as NonNullable<Invoice["employee"]>);
  const contractorName = [emp?.title, emp?.name, emp?.lastName].filter(Boolean).join(" ");

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,user-scalable=yes" />
  <title>Contractor Invoice</title>
  <style>
    :root{
      --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; --band:#f8fafc;
      --accent:#0ea5e9; --accent-weak:#e0f2fe; --ok:#16a34a;
    }
    *{box-sizing:border-box}
    body{margin:0;color:var(--ink);font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;background:#fff}
    .page{width:210mm;min-height:297mm;margin:0 auto;padding:18mm 16mm 16mm;position:relative}
    header{text-align:center;margin-bottom:16mm}
    .logo img{height:40px;opacity:.9}
    .title{display:block;margin-top:8mm;font-weight:800;font-size:28px;letter-spacing:.3px}
    .meta{margin-top:6px;color:var(--muted);font-size:13px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:18mm;align-items:start}
    .box{border:1px solid var(--line);padding:10mm;border-radius:8px;background:linear-gradient(180deg,#fff,#fff 70%,#fcfdff)}
    .box h4{margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}
    .kv{display:flex;gap:12px;margin:2px 0}.kv .label{min-width:42mm;color:var(--muted)}
    .band{margin:12mm 0 6mm;background:var(--band);border:1px solid var(--line);padding:8px 10px;font-weight:700;border-radius:6px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    thead th{text-align:right;padding:10px 8px;background:#f5f7fb;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-weight:700}
    thead th:first-child,tbody td:first-child{text-align:left}
    tbody td{padding:9px 8px;border-bottom:1px solid #f1f5f9;text-align:right}
    .desc,.addr{text-align:left}
    .w-qty{width:60px}.w-money{width:100px}
    .money{white-space:nowrap}
    .table-total td{border-top:1px solid var(--line);font-weight:700}
    .totals-wrap{display:flex;justify-content:flex-end;margin-top:14mm}
    .totals{width:92mm;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 6px 20px rgba(2,6,23,.06),0 1px 0 rgba(2,6,23,.04) inset}
    .totals .row{display:grid;grid-template-columns:1fr auto;gap:16px;padding:12px 16px;align-items:center;border-bottom:1px dashed #eef2f7}
    .totals .row:last-child{border-bottom:none}
    .totals .label{color:var(--muted)} .totals .val{font-variant-numeric:tabular-nums}
    .totals .cis{background:var(--accent-weak)} .totals .cis .label{color:#0369a1}
    .totals .grand{background:#0b1220;color:#fff;padding:16px;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center}
    .totals .grand .label{color:#e2e8ff;letter-spacing:.02em}
    .totals .grand .val{font-weight:800;font-size:22px}
    .badge{font-size:11px;font-weight:700;color:#0369a1;background:var(--accent-weak);padding:2px 8px;border-radius:999px;margin-left:8px}
    @page{size:A4;margin:0}
  </style>
  </head>
  <body>
  <main class="page">
    <header>
      <div class="logo">
        <img src="https://a3e.co.uk/wp-content/uploads/2021/03/a3elogo.png" alt="A3E" />
      </div>
      <span class="title">Contractor’s Invoice</span>
      <div class="meta">
        <span>Invoice No. <strong>${esc(invoiceNo)}</strong></span> &nbsp;•&nbsp;
        <span>Week ending <strong>${esc(weekEnding)}</strong></span>
      </div>
    </header>

    <section class="grid">
      <div class="box">
        <h4>To</h4>
        <div><strong>A3E Online LTD</strong></div>
        <div>7 Chafford Gardens</div>
        <div>West Horndon</div>
        <div>CM13 3NJ</div>
      </div>

      <div class="box">
        <h4>Contractor</h4>
        <div class="kv"><div class="label">Full name</div><div><strong>${esc(contractorName)}</strong></div></div>
        <div class="kv"><div class="label">Address</div><div>${esc(emp?.address)}</div></div>
        <div class="kv"><div class="label">Post code</div><div>${esc(emp?.postcode)}</div></div>
        <div class="kv"><div class="label">Tel</div><div>${esc(emp?.mobile)}</div></div>
      </div>
    </section>

    <div class="band">Work log</div>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th class="addr">Site address/location</th>
          <th class="desc">Detailed job description</th>
          <th class="w-qty">Quant.</th>
          <th class="w-money">Rate</th>
          <th class="w-money">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="table-total">
          <td></td><td class="addr"><strong>Total (table)</strong></td><td></td><td></td><td></td>
          <td class="money"><strong>${money(tableTotal)}</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="totals-wrap">
      <div class="totals" role="group" aria-label="Invoice totals">
        <div class="row">
          <div class="label">Sub-Total</div>
          <div class="val money"><strong>${money(inv.subtotal)}</strong></div>
        </div>
        <div class="row cis">
          <div class="label">Less CIS <span class="badge">20%</span></div>
          <div class="val money">${money(inv.lessCis)}</div>
        </div>
        <div class="grand">
          <div class="label">Total Due</div>
          <div class="val money">${money(inv.totalDue)}</div>
        </div>
      </div>
    </div>
  </main>
  </body>
  </html>`;
};

type Props = { 
  invoice: Invoice,
  onReadyToShare?: (fn: () => void) => void; 
};

export const InvoiceScreen = ({ invoice, onReadyToShare }: Props) => {
  const [busy, setBusy] = useState(false);
  // IMPORTANT: recompute when `invoice` changes
  const html = useMemo(() => buildInvoiceHTML(invoice), [invoice]);

  const onShare = async () => {
    try {
      setBusy(true);
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "application/pdf", UTI: "com.adobe.pdf" });
      } else {
        Alert.alert("Saved", uri);
      }
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    if (onReadyToShare) onReadyToShare(onShare);
  }, [onReadyToShare, html]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
        {busy ? <ActivityIndicator style={{ marginLeft: 12 }} /> : null}
      </View>
      <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
    </View>
  );
};
