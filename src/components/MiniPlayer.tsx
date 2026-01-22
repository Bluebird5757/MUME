import { View, Text, TouchableOpacity } from "react-native";
import { usePlayerStore } from "../store/playerStore";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function MiniPlayer({
  onOpenQueue,
}: {
  onOpenQueue: () => void;
}) {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    position,
    duration,
  } = usePlayerStore();

  if (!currentSong) return null;

  const progress =
    duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View
      style={{
        height: 90,
        backgroundColor: "#1A1A1A",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#2C2C2C",
      }}
    >
      {/* Title + Controls */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          numberOfLines={1}
          style={{ color: "#FFFFFF", flex: 1 }}
        >
          {currentSong.name}
        </Text>

        <TouchableOpacity
          onPress={onOpenQueue}
          style={{ marginRight: 16 }}
        >
          <Text style={{ color: "#9E9E9E" }}>Queue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay}>
          <Text
            style={{
              color: "#F2994A",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Time */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Text style={{ color: "#9E9E9E", fontSize: 12 }}>
          {formatTime(position)}
        </Text>
        <Text style={{ color: "#9E9E9E", fontSize: 12 }}>
          {formatTime(duration)}
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 4,
          backgroundColor: "#2C2C2C",
          marginTop: 6,
          borderRadius: 2,
        }}
      >
        <View
          style={{
            height: 4,
            width: `${progress}%`,
            backgroundColor: "#F2994A",
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );
}
