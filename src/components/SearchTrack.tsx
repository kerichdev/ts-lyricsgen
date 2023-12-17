import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
  Skeleton
} from "@mui/material";
import { useQuery } from "react-query";
import { useState, useEffect, useRef } from 'react';
import searchQuery from "../api/searchQuery";
import "../App.css";
import { useLyricStore } from "../store";

export default function SearchTrack() {
  const { isLoading, data, isError, error, refetch } = useQuery(['search', searchText], () => searchQuery(searchText), {
    enabled: false, // dont query automatically
  });

  let searchText = "";

  const searchRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
      searchText = searchRef!.current?.value;
  }, [searchRef!.current?.value]);
  

  const { setTitle, setArtist } = useLyricStore((state) => state);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
      setIsSnackbarOpen(isError);
  }, [isError]);

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
        inputRef={searchRef}
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
      {isError && (
        <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={() => setIsSnackbarOpen(false)}>
          <Alert onClose={() => setIsSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
            {String(error)}
          </Alert>
        </Snackbar>
      )}
      {data && (
        <List>
          {data.data.results.trackmatches.track.map((track) => (
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