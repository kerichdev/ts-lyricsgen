import { useColor } from "color-thief-react";
import { Backdrop, CircularProgress } from "@mui/material";
import { CSSProperties, useRef } from "react";
import exportAsImage from "../utils/exportAsImage";

interface Props {
  title: string;
  artist: string;
  imgLink: string;
  lyrics: string;
}

interface CardStyles extends CSSProperties {
  "--bg": string;
}

const ColoredCard = (props: Props) => {
  const { title, artist, imgLink, lyrics } = props;

  const exportRef = useRef<HTMLDivElement | null>(null);

  const googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

  const finalImageURL = googleProxyURL + encodeURIComponent(imgLink);

  const { data, loading, error } = useColor(
    finalImageURL,
    "hslArray",
    { crossOrigin: "anonymous" }
  );

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
        ref={exportRef}
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
            <p key={index} onClick={() => exportAsImage(exportRef!.current, "test")}> {line} </p>
          ))}
        </div>
        <div className="copyrightDiv">
          <img className="copyrightedLogo" src="./spotify_logo.png" />
        </div>
      </div>
    );
  }
};

export default ColoredCard