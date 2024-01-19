import SearchTrack from "./components/SearchTrack";
import DisplayLyrics from "./components/DisplayLyrics";
import './index.css'
import { useState } from "react";
import LyricsModal from "./components/LyricsModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <h1> Spotify lyrics card maker </h1>
      <p> Search for your song below: </p>
      <div className="displayClass">
        <SearchTrack />
        <DisplayLyrics handleOpen={handleOpen} />
      </div>
      <LyricsModal handleClose={handleClose} isOpen={isModalOpen} />
    </>
  )
}

export default App
