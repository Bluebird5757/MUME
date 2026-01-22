import {
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { searchSongs } from "../api/saavn";
import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<any[]>([]);
  const playSong = usePlayerStore((state) => state.playSong);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // If input is empty → clear list
    if (!query.trim()) {
      setSongs([]);
      return;
    }

    // Debounced search
    const timeout = setTimeout(async () => {
      try {
        const result = await searchSongs(query);
        setSongs(result);
      } catch (e) {
        console.log("Search error", e);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top + 10,
        paddingHorizontal: 16,
        backgroundColor: "#121212",
      }}
    >
      {/* Header */}
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Mume
        </Text>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search songs, artists..."
        placeholderTextColor="#9E9E9E"
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      />

      {/* Song List */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => playSong(item)}
            onLongPress={() => addToQueue(item)}
            delayLongPress={300}
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#2C2C2C",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#9E9E9E", fontSize: 13 }}>
              {item.primaryArtists}
            </Text>

            {/* Small helper text */}
            <Text style={{ color: "#666", fontSize: 11 }}>
              Tap to play • Long press to add to queue
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
