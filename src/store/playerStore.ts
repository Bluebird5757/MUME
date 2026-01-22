import { create } from "zustand";
import { Audio } from "expo-av";
import { useQueueStore } from "./queueStore";

interface PlayerState {
  sound: Audio.Sound | null;
  currentSong: any;
  isPlaying: boolean;
  position: number;
  duration: number;
  playSong: (song: any) => Promise<void>;
  togglePlay: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  sound: null,
  currentSong: null,
  isPlaying: false,
  position: 0,
  duration: 1,

  playSong: async (song) => {
    try {
      const { sound } = get();

      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const newSound = new Audio.Sound();

      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playsInSilentModeIOS: true,
      });

      const lastSource = song.downloadUrl[song.downloadUrl.length - 1];
      const audioUrl = lastSource.link || lastSource.url;
      if (!audioUrl) return;

      await newSound.loadAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      await newSound.setProgressUpdateIntervalAsync(500);

      newSound.setOnPlaybackStatusUpdate(async (status: any) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          const nextSong =
            useQueueStore.getState().popNext();

          if (nextSong) {
            get().playSong(nextSong);
          } else {
            await newSound.setPositionAsync(0);
            set({
              isPlaying: false,
              position: 0,
            });
          }
          return;
        }

        set({
          position: status.positionMillis ?? 0,
          duration: status.durationMillis ?? 1,
        });
      });

      set({
        sound: newSound,
        currentSong: song,
        isPlaying: true,
        position: 0,
      });
    } catch (e) {
      console.log("Audio error", e);
    }
  },

  togglePlay: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  seekTo: async (millis) => {
    const { sound } = get();
    if (!sound) return;

    await sound.setPositionAsync(millis);
    set({ position: millis });
  },
}));
