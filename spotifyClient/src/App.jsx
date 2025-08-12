import Library from './components/Library';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const getMyToken = async () => {
    return axios.get('https://myspotifylib.onrender.com/auth/access-token', {
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

        const tracksResponse = await axios.get('https://api.spotify.com/v1/me/tracks', {
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
        
     { tracks.length === 0  && <a href= "https://myspotifylib.onrender.com/auth/login">
                                  <button>Login with Spotify</button>
                              </a> 
      }
      { tracks.length >0 && <Library tracks={tracks} />} 
    </>
  )
}

export default App
