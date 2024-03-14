import { useColor } from "color-thief-react";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { Done, Deselect } from "@mui/icons-material";
import { CSSProperties } from "react";
import { useLyricsCardStore } from "../store";

interface Props {
  title: string;
  artist: string;
  imgLink: string;
  lyrics: string;
  handleOpen: () => void
}

interface CardStyles extends CSSProperties {
  "--bg": string;
}

interface SelectedString {
  line: string;
  id: number;
}

const ColoredCard = (props: Props) => {
  let selectedLyrics: SelectedString[] = [];
  const setCardSettings = useLyricsCardStore((state) => state.setCardSettings);

  const { title, artist, imgLink, lyrics, handleOpen } = props;

  const googleProxyURL =
    "https://cors.kerichuu.space/";

  const finalImageURL = googleProxyURL + imgLink;

  const { data, loading, error } = useColor(
    finalImageURL,
    "hslArray",
    { crossOrigin: "anonymous" }
  );

  const toggleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedLyrics.some((lyric) => lyric.id === Number(e.currentTarget.id))) {
      selectedLyrics = selectedLyrics.filter((lyric) => lyric.id !== Number(e.currentTarget.id));
      e.currentTarget.classList.remove("selectedLine");
    }

    else{
      selectedLyrics.push({ line: e.currentTarget.innerHTML, id: Number(e.currentTarget.id) });
      e.currentTarget.classList.add("selectedLine");
    }
  }

  const deselectAll = () => {
    selectedLyrics = [];
    document.querySelectorAll(".selectedLine").forEach((line) => line.classList.remove("selectedLine"));
  }

  const confirmSelection = () => {
    setCardSettings({ 
      title: title, 
      artist: artist, 
      imgLink: finalImageURL, 
      lyrics: selectedLyrics.sort(el => el.id),
      bgColor: `hsl(${data![0]}, ${data![1]}%, 
        ${parseInt(data![2]) < 40 ? 40 :
          parseInt(data![2]) > 80 ? 80 : data![2]}%)`
     });
    deselectAll();
    handleOpen();
  }

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div className="errorCard">Something went wrong...</div>
  }

  if (data) {
    return (
      <div
        className="column"
        id="lyrics"
        style={{
          "--bg": `hsl(${data[0]}, ${data[1]}%, 
            ${parseInt(data[2]) < 40 ? 40 :
              parseInt(data[2]) > 80 ? 80 : data[2]}%)`,} as CardStyles }
      >
        <div className="lyricsCard">
          <img className="albumCover" src={finalImageURL} />
          <div className="lyricsNames">
            <h2> {title} </h2>
            <h3> {artist} </h3>
          </div>
        </div>
        <div className="lyricsScrollable">
          {lyrics && lyrics.split("\n").map((line, index) => (
            <p key={index} onClick={toggleSelect} id={index.toString()}> {line} </p>
          ))}
        </div>
        <div className="copyrightDiv">
          <img className="copyrightedLogo" src="./spotify_logo.png" />
        </div>
        <div className="buttonsRow">
          <IconButton aria-label="deselect all" onClick={deselectAll}>
            <Deselect />
          </IconButton>
          <IconButton aria-label="confirm selection" onClick={confirmSelection}>
            <Done />
          </IconButton>
        </div>
      </div>
    );
  }
};

export default ColoredCard