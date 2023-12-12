import {
  Avatar,
  Button,
  Select,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Alert,
  Snackbar,
  Skeleton
} from "@mui/material"
import { useQuery } from "react-query";
import searchQuery from "./api/searchQuery";
import React, { useState, useEffect, ReactNode } from 'react';
import './App.css'

function App() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery(['search', searchText], () => searchQuery(searchText), {
    enabled: false, // dont query automatically
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(isError);
  }, [isError]);

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
    <>
      <h1> Well... this is awkward. </h1>
      <p> Search for your song below: </p>
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
            <ListItem key={`${track.name}-${track.artist}`} className="listItem">
              <ListItemText
                primary={track.name}
                secondary={`Artist: ${track.artist}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

export default App
