export interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: number;
}

interface TrackMatches {
  track: Track[];
}