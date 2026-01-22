import { create } from "zustand";

interface QueueState {
  queue: any[];
  addToQueue: (song: any) => void;
  removeFromQueue: (id: string) => void;
  popNext: () => any | null;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueState>((set, get) => ({
  queue: [],

  addToQueue: (song) => {
    set((state) => ({
      queue: [...state.queue, song],
    }));
  },

  removeFromQueue: (id) => {
    set((state) => ({
      queue: state.queue.filter((s) => s.id !== id),
    }));
  },

  popNext: () => {
    const { queue } = get();
    if (queue.length === 0) return null;

    const [next, ...rest] = queue;
    set({ queue: rest });
    return next;
  },

  clearQueue: () => set({ queue: [] }),
}));
