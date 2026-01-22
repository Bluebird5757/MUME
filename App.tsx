import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";
import { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import MiniPlayer from "./src/components/MiniPlayer";
import QueueScreen from "./src/screens/QueueScreen";

export default function App() {
  const [showQueue, setShowQueue] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "#121212" }}>
        <HomeScreen />
        <MiniPlayer onOpenQueue={() => setShowQueue(true)} />

        {showQueue && (
          <QueueScreen onClose={() => setShowQueue(false)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}
