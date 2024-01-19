import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SelectedString {
  line: string;
  id: number;
}

interface CardSettings {
  title: string;
  artist: string;
  imgLink: string;
  lyrics: SelectedString[];
  bgColor: string;
}

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

interface LyricsCardStore {
  cardSettings: CardSettings;
  setCardSettings: (
    cardSettings: CardSettings,
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

export const useLyricsCardStore = create<LyricsCardStore>()(
  (set) => ({
    cardSettings: {
      title: "",
      artist: "",
      imgLink: "",
      lyrics: [],
      bgColor: "",
    },
    setCardSettings: (cardSettings: CardSettings) => set({ cardSettings }),
  })
)