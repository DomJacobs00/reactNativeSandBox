import { Tabs } from "expo-router";
import '../global.css'
export default function RootLayout() {
  return (

    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
