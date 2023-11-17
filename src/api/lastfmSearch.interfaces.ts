export interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: number;
}

export interface TrackMatches {
  track: Track[];
}

export interface ResultsObject {
  trackmatches: TrackMatches;
}

export interface Results {
  results: ResultsObject;
}

