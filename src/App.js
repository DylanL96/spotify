import React, {useState} from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import data from './util';

const App = () => {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <div className='App'>
      <Song currentSong={currentSong}/>
      <Player/>
    </div>
  )
}

export default App;
