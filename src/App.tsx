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
} from "@mui/system"
//
import { useQuery } from "react-query";
import searchQuery from "./api/searchQuery";
//
import React, { useState, useEffect } from 'react';
import './App.css'

function App() {

  const track = "sovereign";
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['findTrack', track],
    queryFn: async () => {
     const data = await searchQuery(track);
     return data.data.results;
    }
   });
    
  useEffect(() => {
    if (!isLoading) {
    console.log(isError ? error : data);
    }
   }, [isLoading]);

  return (
    <>

    </>
  )
}

export default App
