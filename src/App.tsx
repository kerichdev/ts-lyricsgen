import SearchTrack from "./components/SearchTrack";
import DisplayLyrics from "./components/DisplayLyrics";
import './index.css'

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
