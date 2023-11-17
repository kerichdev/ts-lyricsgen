import axios from 'axios';
import { Results } from "./lastfmSearch.interfaces";

export default async function searchQuery(track: string, api_key: string) {
  return await axios.get<Results>(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${api_key}&format=json`
  );
}