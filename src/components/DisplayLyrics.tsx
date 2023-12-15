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