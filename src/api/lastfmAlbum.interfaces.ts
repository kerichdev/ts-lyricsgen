export interface Image {
  text: string;
  size: string;
}

export interface AlbumObject {
  artist: string;
  mbid: string;
  tags: string;
  name: string;
  image: Image;
}

export interface Album {
  album: AlbumObject;
}