import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LyricStore {
  title: string;
  artist: string;
  setTitle: (
    title: string,
  ) => void;

  setArtist: (
    artist: string,
  ) => void;
}

export const useLyricStore = create<LyricStore>()(
  devtools(
    (set) => ({
      title: "",
      artist: "",
      setTitle: (title: string) => set({ title }),
      setArtist: (artist: string) => set({ artist }),
    })
  )
)
