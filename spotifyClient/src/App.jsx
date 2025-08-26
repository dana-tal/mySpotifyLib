import Library from './components/Library';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { getSongsGroup, getAlbumsGroup, getArtistsList } from './utils/requests';

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

console.log("my domain:"+DOMAIN);

function App() {
  
  
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

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
      /*  const tokenResponse = await getMyToken();
        const accessToken = tokenResponse.data.accessToken;
        setToken(accessToken);
        setUserId(tokenResponse.data.userId);
*/

        const mySongs = await getSongsGroup(5,0);
        //console.log(mySongs);
        setTracks(mySongs.items);

        const myAlbums = await getAlbumsGroup(50,0);
        //console.log( myAlbums.items);
        setAlbums(myAlbums.items);

        const myArtists = await getArtistsList(50);
       // console.log ("myArtists:");
       // console.log(myArtists);

       // console.log(myArtists.artists.items);
        setArtists(myArtists.artists.items);

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
      { tracks.length >0 && <Songs tracks={tracks} />} 
      { albums.length >0 && <Albums albums={albums} />}
      { artists.length >0 && <Artists artists={artists} />}
    </>
  )
}

export default App
