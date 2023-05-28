import React, { useEffect, useRef, useState } from "react";
import { Audio, Music } from "./styled";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { songList } from "./songsData";
import { BsFillPlayFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { BiSkipNextCircle } from "react-icons/bi";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songList[1]);
  const audioRef = useRef();
  const animation = useAnimation();
  const progressRef = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animation.start({
        rotate: [0, 360],
        transition: {
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        },
      });
    } else {
      animation.stop();
    }
  }, [isPlaying]);

  const onPlaying = () => {
    let length = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    let pr = (currentTime / length) * 100;
    setCurrentSong({ ...currentSong, progress: pr, duration: length });
  };

  const previousHandler = () => {
    let index = songList.findIndex((item) => item.title === currentSong.title);
    console.log(index);
    // setIsPlaying(false);
    if (index == 0) {
      setCurrentSong(songList[songList.length - 1]);
    } else {
      setCurrentSong(songList[index - 1]);
    }
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };
  const nextHandler = () => {
    let index = songList.findIndex((item) => item.title === currentSong.title);
    // setIsPlaying(false);
    if (index == songList.length - 1) {
      setCurrentSong(songList[0]);
    } else {
      setCurrentSong(songList[index + 1]);
    }
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };
  const seekHandler = (e) => {
    const currentPosition = e.nativeEvent.offsetX;
    const totalWidth = progressRef.current.clientWidth;
    const newProgress = (currentPosition / totalWidth) * 100;
    setCurrentSong({ ...currentSong, progress: newProgress });
    audioRef.current.currentTime = (newProgress / 100) * currentSong.duration;
  };
  return (
    <Wrapper>
      <motion.div
        animate={animation}
        // animate={{
        //   rotate: isPlaying && [0, 360],
        // }}
        // transition={{
        //   repeat: Infinity,
        //   type: "tween",
        //   duration: 10,
        //   ease: "linear",
        // }}
        className="image"
      >
        <img src={currentSong.imageURL} />
      </motion.div>
      <Music>
        <audio
          src={currentSong.url}
          ref={audioRef}
          onTimeUpdate={onPlaying}
          autoPlay
        />
        <p>{currentSong.title}</p>
        <Audio ref={progressRef} onClick={seekHandler}>
          <div
            style={{ width: `${currentSong.progress}%` }}
            className="progress"
          ></div>
        </Audio>
        <div className="btn-container">
          <button onClick={previousHandler}>
            <BiSkipPreviousCircle />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <BsPauseCircleFill /> : <BsFillPlayFill />}
          </button>
          <button onClick={nextHandler}>
            <BiSkipNextCircle />
          </button>
        </div>
      </Music>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1900px;
  width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #1d267d;
  gap: 90px;
  .image {
    margin-bottom: 10px;
    border-radius: 50%;
    width: 270px;
    height: 270px;
    img {
      /* border: 2px solid black; */
      height: 100%;
      width: 100%;
      border-radius: 50%;
      object-fit: cover;
      background-position: center left;
    }
  }
`;

export default App;
