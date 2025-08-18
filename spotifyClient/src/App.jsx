import Library from './components/Library';

import { useEffect, useState } from 'react';
import axios from 'axios';

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

console.log("my domain:"+DOMAIN);

function App() {
  
  
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const getMyToken = async () => {
    return axios.get(DOMAIN+'/auth/access-token', {
      withCredentials: true
    });
  };


    useEffect(() => {
    const loginResp = new URLSearchParams(window.location.search).get('login');
    if (loginResp !== 'success') return;

    const fetchData = async () => {
      try {
        const tokenResponse = await getMyToken();
        const accessToken = tokenResponse.data.accessToken;
        setToken(accessToken);
        setUserId(tokenResponse.data.userId);

        console.log("songs api:"+import.meta.env.VITE_SPOTIFY_SONGS_ENTRY_POINT);
        const tracksResponse = await axios.get(import.meta.env.VITE_SPOTIFY_SONGS_ENTRY_POINT, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setTracks(tracksResponse.data.items);
        console.log(tracksResponse.data.items);

      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);


// "https://myspotifylib.onrender.com/auth/login

  return (
    <>
        
     { tracks.length === 0  && <a href={`${DOMAIN}/auth/login`}>
                                  <button>Login with Spotify  22</button>
                              </a> 
      }
      { tracks.length >0 && <Library tracks={tracks} />} 
    </>
  )
}

export default App
