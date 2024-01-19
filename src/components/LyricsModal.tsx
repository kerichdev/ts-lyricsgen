import { Box, Modal, Button } from "@mui/material";
import { useLyricsCardStore } from "../store";
import exportAsImage from "../utils/exportAsImage";
import { useRef, CSSProperties } from "react";

interface Props {
  handleClose: () => void;
  isOpen: boolean;
}

interface CardStyles extends CSSProperties {
  "--font-size-multiplier": number;
}

export default function LyricsModal(props: Props) {
  const exportRef = useRef<HTMLDivElement>(null);

  const cardSettings = useLyricsCardStore((state) => state.cardSettings);
  const { handleClose, isOpen } = props;

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60svh",
    minWidth: "80svw",
    margin: "15px 15px",
    borderRadius: "5px",
    padding: "25px",
    bgcolor: "background.paper",
    color: "black",
    lineHeight: "0.1",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-lyricsExport"
    >
      <Box sx={style}>
        <Button onClick={() => exportAsImage(exportRef?.current, "export")}>Export</Button>
        <div
          className="column lyrics"
          style={{
            backgroundColor: cardSettings.bgColor,
            "--font-size-multiplier": 1.75
          } as CardStyles}
          ref={exportRef}
        >
          <div className="lyricsCard">
            <img className="albumCover" src={cardSettings.imgLink} />
            <div className="lyricsNames">
              <h2> {cardSettings.title} </h2>
              <h3> {cardSettings.artist} </h3>
            </div>
          </div>
          <div className="lyricsScrollable">
            {cardSettings.lyrics &&
              cardSettings.lyrics.map((el, index) => (
                <p key={index}> {el.line} </p>
              ))}
          </div>
          <div className="copyrightDiv">
            <img className="copyrightedLogo" src="./spotify_logo.png" />
          </div>
        </div>
      </Box>
    </Modal>
  );
}
