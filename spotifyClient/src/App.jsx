import Library from './components/Library';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
   let token;

     const login_resp =  new URLSearchParams(window.location.search).get('login');
     if (!login_resp)
      return;
     if ( login_resp==='success')
     {
          token_response = axios.get('https://myspotifylib.onrender.com/auth/access-token' );
          token = token_response.data.accessToken;
          userId = token_response.data.userId;

          console.log("token="+token);
          console.log("userId="+userId);

        axios.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          setTracks(response.data.items);
          console.log(tracks);
        }); 

     }

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
