import axios from 'axios';
import { Lyrics } from "./lyrist.interface";

export default async function lyristQuery(track: string, artist: string) {
  if(!track || !artist) return;
  
  return await axios.get<Lyrics>(
    `https://lyrist.vercel.app/api/${encodeURIComponent(artist)}/${encodeURIComponent(track)}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}