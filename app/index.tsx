import { Text, View } from "react-native";
import '../global.css'
import { SafeAreaView } from "react-native-safe-area-context";
import InvoiceManager from "@/components/invoiceManager";
export default function Index() {
  return (
    <SafeAreaView>

      <InvoiceManager/>
    </SafeAreaView>
  );
}
