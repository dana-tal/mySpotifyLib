import Library from './components/Library';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
   let token;


     const getMyToken = async ()=>{
           const token_response = await axios.get('https://myspotifylib.onrender.com/auth/access-token' );

          console.log("token response:");
          console.log(token_response);

          console.log ("accessToken="+token_response.data.accessToken)
           setToken( token_response.data.accessToken);
           setUserId( token_response.data.userId);
     }

     const login_resp =  new URLSearchParams(window.location.search).get('login');
     if (!login_resp)
      return;
     if ( login_resp==='success')
     {
         getMyToken();
          
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
