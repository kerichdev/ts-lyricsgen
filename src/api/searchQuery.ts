import axios from 'axios';
import { Results } from "./lastfmSearch.interfaces";

async function loadKey() {
  try {
    const secrets = await import("../secrets.ts").catch(err => err);
    if (secrets.API_KEY) {
      return secrets.API_KEY;
    }
  }
  catch {
    return "NO_API_KEY_IDIOT";
  }
}

export default async function searchQuery(track: string) {
  const key = await loadKey();
  return await axios.get<Results>(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${key}&format=json`
  );
}