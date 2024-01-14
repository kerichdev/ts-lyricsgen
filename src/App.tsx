// import { useQuery } from "react-query";
// import React, { useState, useEffect } from 'react';
import SearchTrack from "./components/SearchTrack";
import './index.css'
import DisplayLyrics from "./components/DisplayLyrics";

function App() {
  return (
    <>
      <h1> Spotify lyrics card maker </h1>
      <p> Search for your song below: </p>
      <div className="displayClass">
        <SearchTrack />
        <DisplayLyrics />
      </div>
    </>
  )
}

export default App
