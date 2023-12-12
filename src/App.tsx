import {
  Button,
  Select,
  TextField,
  Chip,
  List,
  Tooltip,
  Alert,
  Snackbar
} from "@mui/material"
//
import {
  Box,
  Container,
  Stack
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {String(error)}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}

export default App
