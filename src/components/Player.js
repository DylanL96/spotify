import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';

// uncontrol input is input that has nothign to do with state.
// ex <input type="range"/> this is not connected to state

//example of controlled input. It has something to do with state
// <input type="range" state={state}/>

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs, setCurrentSong}) => {

  const activeLibraryhandler = nextPrev => {
    // add active state
    const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id){
        // return the whole song, but change active to true
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    }); 
    setSongs(newSongs);
  }
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

  // format the time into minutes and seconds 
  const getTime = time => {
    return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
  };

  const dragHandler = e => {
    // need to update the audio so we can play wherever we drag the input bar
    audioRef.current.currentTime = e.target.value;

    // whatever we have there already, we keep it, but update curent time
    // so we update currentTime to e.target.value (wherever we are draggin the input bar)
    setSongInfo({...songInfo, currentTime: e.target.value});
  }

  const skipTrackHandler = async direction => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip-forward'){
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryhandler(songs[(currentIndex + 1) % songs.length]);
    } 
    if(direction === 'skip-back'){
      if((currentIndex - 1) % songs.length === -1){
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryhandler(songs[songs.length - 1]);
        return; // need return statement so it will not run the code below
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryhandler(songs[(currentIndex - 1) % songs.length]);
    }
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        {/* songInfo.duration || 0 because it initially loads NaN so we set default to 0 */}
        <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type='range'/>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back' size='2x' icon={faAngleLeft}/> 
        <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying? faPause : faPlay}/>
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight}/>
      </div>
    </div>
  )
}

export default Player;