import React from 'react';

const LibrarySong = ({isPlaying, song, songs, setCurrentSong, id, setSongs, audioRef}) => {

  const songSelectHandler = async () => {
    // setCurrentSong(song);
    // Dont need this it is redundant since we are already passing song
    const selectedSong = songs.filter((state) => state.id === id); 
    await setCurrentSong(selectedSong[0]); // filter returns array so we have to select the first element

    // add active state
    const newSongs = songs.map((song) => {
      if(song.id === id){
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
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
      <img alt={song.name} src={song.cover}></img>
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong;