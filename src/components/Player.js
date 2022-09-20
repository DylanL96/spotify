import React, {useState, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
  const [songInfo, setSongInfo] = useState({currentTime: null, duration: null});

  // if need to select specific HTML tag in component, we use reference (useRef)
  const audioRef = useRef(null);

  // handler for playing the song
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying); // sets to false after clicking
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = e => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // this means whatever info we have already, but update currentTime and duration
    setSongInfo({...songInfo, currentTime: current, duration: duration});
  };

  // format the time into minutes and seconds 
  const getTime = time => {
    return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input type='range'/>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft}/> 
        <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={faPlay}/>
        <FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight}/>
      </div>
      {/* onLoadedMetaData allows app to update the state when the file is loaded. This lets you see the duration of the song be visible right away, rather than having it start at 0:00 and needing to press play to update the duration of song. */}
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;