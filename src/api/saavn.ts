import { mockSongs } from "../data/mocksongs";

export const searchSongs = async (query: string) => {
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  return mockSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(q) ||
      song.primaryArtists.toLowerCase().includes(q)
  );
};
