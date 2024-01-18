import { useColor } from "color-thief-react";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  title: string;
  artist: string;
  imgLink: string;
  lyrics: string;
}

const ColoredCard = (props: Props) => {
  const { title, artist, imgLink, lyrics } = props;

  const googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

  const { data, loading, error } = useColor(
    googleProxyURL + encodeURIComponent(imgLink),
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
    throw new Error(error);
  }

  if (data) {
    console.log(data);
    return (
      <div
        className="column"
        id="lyrics"
        style={{
          backgroundColor: `hsl(${data[0]}, ${data[1]}%, 
                                                        ${parseInt(data[2]) < 40 ? 40 :
                                                          parseInt(data[2]) > 80 ? 80 : data[2]}%)`}}
      >
        <div className="lyricsCard">
          <img className="albumCover" src={imgLink} />
          <div className="lyricsNames">
            <h2> {title} </h2>
            <h3> {artist} </h3>
          </div>
        </div>
        <div className="lyricsScrollable">
          {lyrics.split("\n").map((line, index) => (
            <p key={index}> {line} </p>
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