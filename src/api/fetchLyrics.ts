import axios from 'axios';
import { Lyrics } from "./lyrist.interface";

export default async function lyristQuery(track: string, artist: string) {
  return await axios.get<Lyrics>(
    `https://pylyrical-api.onrender.com/lyrics?q=${artist.replace(/ /g, '+')}+${track.replace(/ /g, '+')}`
  );
}