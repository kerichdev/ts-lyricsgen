import axios from 'axios';
import { Results } from "./lastfmSearch.interfaces";

export default async function searchQuery(track: string) {
  const key = import.meta.env.VITE_LASTFM;
  if (!key || key === '') {
    throw new Error('Get a Last.fm API key, idiot');
  }
  return await axios.get<Results>(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${key}&format=json`
  );
}