import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Alert, Snackbar, Skeleton } from "@mui/material";
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

  return (
    <div className="column">
      <TextField
        label="Enter your search query"
        value={searchText}
        onChange={handleSearchChange}
      />
      <Button onClick={handleSearch}>Search</Button>
      {isLoading && (
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
          {data.results.trackmatches.track.map((track) => (
            <ListItem 
              key={`${track.name}-${track.artist}`}
              className="listItem"
              onClick={() => {
                setTitle(track.name);
                setArtist(track.artist);
                } 
              }
            >
              <ListItemText
                primary={track.name}
                secondary={`Artist: ${track.artist}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}