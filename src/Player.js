import { useEffect, useState } from "react";
import useSound from "use-sound";
import queen from "./assets/queen.mp3";
import album from "./assets/album_queen.jpg";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(queen);
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    sec: "",
    min: "",
  });
  const [seconds, setSeconds] = useState();

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    setTime({
      min: min,
      sec: secRemain,
    });
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img src={album} width="300" alt="" />
      <div className="field__information">
        <h3 className="title">Love of my Life</h3>
        <p className="subTitle">Queen</p>
      </div>
      <div className="field__option">
        <button className="play__button">
          <IconContext.Provider value={{ size: "3em", color: "#ececec" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying && (
          <button
            className="play__button button_function"
            onClick={playingButton}
          >
            <IconContext.Provider value={{ size: "3em", color: "#fff" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        )}
        {isPlaying && (
          <button
            className="play__button button_function"
            onClick={playingButton}
          >
            <IconContext.Provider value={{ size: "3em", color: "#fff" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="play__button">
          <IconContext.Provider value={{ size: "3em", color: "#ececec" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>

        <div>
          <span className="time">
            {currTime.min}:{currTime.sec}
          </span>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            default="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
          <span className="time">
            {time.min}:{time.sec}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Player;
