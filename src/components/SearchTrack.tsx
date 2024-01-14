import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Alert, Snackbar, Skeleton, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import searchQuery from "../api/searchQuery";
import { useLyricStore } from "../store";

export default function SearchTrack() {
  const [searchText, setSearchText] = useState("");
  //also some nicer error handling
  const [errorBuffer, setErrorBuffer] = useState<string[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { setTitle, setArtist } = useLyricStore((state) => state);

  const { isLoading, data, isError, error, refetch } = useQuery(['search', searchText], () => searchQuery(searchText), {
    enabled: false, // dont query automatically
  });

  useEffect(() => {
    if (isError) {
      setErrorBuffer(prevBuffer => [...prevBuffer, String(error)]);
    }
  }, [isError, error]);
  
  useEffect(() => {
    if (errorBuffer.length > 0 && !isSnackbarOpen) {
      setIsSnackbarOpen(true);
    }
  }, [errorBuffer, isSnackbarOpen]);

  const handleSnackbarClose = () => {
    setErrorBuffer(prevBuffer => prevBuffer.slice(1));
    setIsSnackbarOpen(false);
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleSearch = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleListItemClick = (track: { name: string; artist: string; }) => {
    setTitle(track.name);
    setArtist(track.artist);
  }

  return (
    <div className="column">
      <TextField
        label="Enter your search query"
        value={searchText}
        onChange={handleSearchChange}
      />

      {searchText.length >= 2 && (
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      )}
        
      {isLoading && searchText.length >= 2 && (
        <List>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index}>
              <Skeleton variant="rectangular" width="100%" height={60} animation="wave" />
            </ListItem>
          ))}
        </List>
      )}
      {errorBuffer.length > 0 && (
        <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {errorBuffer[0]}
          </Alert>
        </Snackbar>
      )}
      {data && (
        <List>
          {/* limit to 5 results to prevent overflow */}
          {data.results.trackmatches.track.slice(0, 5).map((track) => (
            <ListItem 
              key={`${track.name}-${track.artist}`}
              className="listItem"
              onClick={() => handleListItemClick(track)}
            >
              <ListItemText
                primary={track.name}
                secondary={track.artist}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}