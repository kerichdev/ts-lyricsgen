import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
  Skeleton
} from "@mui/material"
import { useQuery } from "react-query";
import React, { useState, useEffect } from 'react';
import SearchTrack from "./components/SearchTrack";
import './App.css'

function App() {
  return (
    <>
      <h1> Well... this is awkward. </h1>
      <p> Search for your song below: </p>
      <SearchTrack />
    </>
  )
}

export default App
