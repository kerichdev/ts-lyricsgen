// will probably have to rewrite this ground up? or not
// this is ONLY responsible for displaying lyrics and not choosing them

import {
  Snackbar,
  Skeleton,
  Alert
} from "@mui/material";
import { useQuery } from "react-query";
import React, { useState, useEffect } from 'react';
import lyricsQuery from "../api/fetchLyrics";
import "../App.css"

export default function DisplayLyrics() {
  const [track, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery(['lyrics', track, artist], () => lyricsQuery(track, artist), {
    enabled: false,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(isError);
  }, [isError]);

  const handleLyricsQueryChange = (track: string, artist: string) => {
    setTitle(track);
    setArtist(artist);
  };
  const handleLyricsQuery = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height={60} animation="wave" />
      )}
      {isError && (
        <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={() => setIsSnackbarOpen(false)}>
          <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
            {String(error)}
          </Alert>
        </Snackbar>
      )}
      {data && <p>{data.data.lyrics}</p>}
    </>
  )
}
