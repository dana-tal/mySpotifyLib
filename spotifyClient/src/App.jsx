import Library from './components/Library';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('access_token');
    if (!token) return;

    axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setTracks(response.data.items);
      console.log(tracks);

    });
  }, []);

  //https://terminally-excited-shiner.ngrok-free.app , http://localhost:3000/auth/login

  return (
    <>
        
     { tracks.length === 0  && <a href="https://factory-hiqy.onrender.com/">
                                  <button>Login with Spotify</button>
                              </a> 
      }
      { tracks.length >0 && <Library tracks={tracks} />} 
    </>
  )
}

export default App
