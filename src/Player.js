import { useEffect, useState } from "react";
import useSound from "use-sound";
import queen from "./assets/queen.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(queen);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img src="" alt="" />
      <div>
        <h3 className="title">Love of my Life</h3>
        <p className="subTitle">Queen</p>
      </div>
      <div className="">
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27ae60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying && (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27ae60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        )}
        {isPlaying && (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27ae60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27ae60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default Player;
