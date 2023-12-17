import { useQuery } from "react-query";
import React, { useState, useEffect } from 'react';
import SearchTrack from "./components/SearchTrack";
import './App.css'
import DisplayLyrics from "./components/DisplayLyrics";

function App() {
  return (
    <>
      <h1> Well... this is awkward. </h1>
      <p> Search for your song below: </p>
      <div className="displayClass">
        <SearchTrack />
        <DisplayLyrics />
      </div>
    </>
  )
}

export default App
