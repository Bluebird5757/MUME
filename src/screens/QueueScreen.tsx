import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQueueStore } from "../store/queueStore";

export default function QueueScreen({
  onClose,
}: {
  onClose: () => void;
}) {
  const { queue, removeFromQueue } = useQueueStore();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "70%",
        backgroundColor: "#121212",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          Queue
        </Text>

        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: "#F2994A", fontSize: 16 }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>

      {/* Queue List */}
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#2C2C2C",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "white",
                flex: 1,
                marginRight: 10,
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <TouchableOpacity
              onPress={() => removeFromQueue(item.id)}
            >
              <Text style={{ color: "#F2994A" }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
