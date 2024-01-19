import { Snackbar, Alert, CircularProgress, Backdrop } from "@mui/material";
import { useQuery } from "react-query";
import { useState, useEffect } from 'react';
import lyricsQuery from "../api/fetchLyrics";
import { useLyricStore } from "../store";
import { Lyrics } from "../api/lyrist.interface";
import ColoredCard from "./ColoredCard"

interface Props {
  handleOpen: () => void
}

export default function DisplayLyrics(props: Props) {
  const { title: currentTitle, artist: currentArtist } = useLyricStore((state) => state);
  const { isLoading, data, isError, error } = useQuery(['lyrics', currentTitle, currentArtist], () => lyricsQuery(currentTitle, currentArtist), {
    enabled: true,
    refetchOnWindowFocus: false,
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(isError);
  }, [isError]);

  if (isError)
    return (
      <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {String(error)}
        </Alert>
      </Snackbar>
    );

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
  if (data) {
    const imgLink = data?.data.image;
    const { lyrics, title, artist }: Lyrics = data.data;
    return (
      <ColoredCard title={title} artist={artist} imgLink={imgLink} lyrics={lyrics} handleOpen={props.handleOpen} />
      );
    }
  }
}