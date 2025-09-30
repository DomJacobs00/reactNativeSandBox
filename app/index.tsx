import { Text, View } from "react-native";
import '../global.css'
import { SafeAreaView } from "react-native-safe-area-context";
import InvoiceManager from "@/components/invoiceManager";
import { useState } from "react";
import { DistBoardsManager } from "@/components/distBoardsManager";
export default function Index() {
  const[stage, setStage] = useState('DBM')
  return (
    <SafeAreaView>
      {stage === 'IM' && (
        <InvoiceManager/>
      )}
      {stage === 'DBM' && (
        <DistBoardsManager/>
      )}
    </SafeAreaView>
  );
}
