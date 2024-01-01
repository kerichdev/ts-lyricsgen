import axios from 'axios';
import { Lyrics } from "./lyrist.interface";

export default async function lyristQuery(track: string, artist: string) {
  return await axios.get<Lyrics>(
    `https://lyrist.vercel.app/api/${track}/${artist}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}