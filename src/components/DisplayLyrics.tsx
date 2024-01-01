import {
  Snackbar,
  Skeleton,
  Alert
} from "@mui/material";
import { useQuery } from "react-query";
import { useState, useEffect } from 'react';
import lyricsQuery from "../api/fetchLyrics";
import "../App.css"
import { useLyricStore } from "../store";

export default function DisplayLyrics() {
  const { title, artist } = useLyricStore((state) => state);

  const { isLoading, data, isError, error } = useQuery(['lyrics', title, artist], () => lyricsQuery(title, artist), {
    enabled: true,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(isError);
  }, [isError]);

  console.log(title, artist);

  if (isLoading)
    return (
      <Skeleton variant="rectangular" width="100%" height={60} animation="wave" />
    );

  if (isError)
    return (
      <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {String(error)}
        </Alert>
      </Snackbar>
    );

  if (data)
    return (
      <>
        <div className="column">
          <div className="lyricsBox">
            <div className="displayClassLyricsBox">
            <div className="column">
              <img src={data?.data.image} alt="album cover" className="albumCover" />
            </div>
            <div className="column">
              <p className="lyricsTitle">
                {title}
              </p>
              <p className="lyricsArtist">
                {artist}
              </p>
            </div>
            </div>
            {data && data.data.lyrics.split('\n').map((line, index) => (
              <p 
                key={index}
                className="lyricsLine"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </>
    );
}