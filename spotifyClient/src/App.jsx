import Welcome from './components/Welcome';
import Library from './components/Library';
import {Route,Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Songs from './components/Songs';
import SongPage from './components/SongPage';
import Albums from './components/Albums';
import Artists from './components/Artists';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';

function App() {
  
  const navigate = useNavigate();
  const [notRegistered, setNotRegistered] = useState(false);
  
    useEffect(() => {
    const loginResp = new URLSearchParams(window.location.search).get('login');
    if ( loginResp === 'not_registered')
    {
        setNotRegistered(true);
        console.log("User Not Registered");
    }
   else if ( loginResp ==='success')
   {
        sessionStorage.setItem("songs_mode","normal");
        sessionStorage.setItem("songs_searchType",'library');
        sessionStorage.setItem("songs_searchTerm",'');
        sessionStorage.setItem("songs_normal_pageNum",1);
        sessionStorage.setItem("songs_library_search_pageNum",1);
        sessionStorage.setItem("songs_spotify_search_pageNum",1);

        sessionStorage.setItem("albums_mode","normal");
        sessionStorage.setItem("albums_searchType",'library');
        sessionStorage.setItem("albums_searchTerm",'');
        sessionStorage.setItem("albums_normal_pageNum",1);
        sessionStorage.setItem("albums_library_search_pageNum",1);
        sessionStorage.setItem("albums_spotify_search_pageNum",1);

        sessionStorage.setItem("artists_currentPage","");
        sessionStorage.setItem("artists_nextPage","");
        sessionStorage.setItem("artists_cursorHistory",JSON.stringify([]));
        sessionStorage.setItem("artists_hasNext",JSON.stringify(false));

        sessionStorage.setItem("artists_mode","normal");
        sessionStorage.setItem("artists_searchType",'library');
        sessionStorage.setItem("artists_searchTerm",'');
        sessionStorage.setItem("artists_normal_pageNum",1);
        sessionStorage.setItem("artists_library_search_pageNum",1);
        sessionStorage.setItem("artists_spotify_search_pageNum",1);

        navigate("/library/songs");
   }
    // if (loginResp !== 'success') return;
   

  }, []);

  return (
    <div >
         { notRegistered && <span style={{ color:'red'}}>Spotify account not found. Please log in with a valid Spotify account. </span>} 
         { !notRegistered && <Routes>
              <Route path="/" element={ <Welcome /> } />
              <Route path="/library" element={<Library/>} >
                <Route path="songs" element={<Songs/>} />
                <Route path="songs/:id" element={<SongPage/>} />   
                <Route path="albums" element={<Albums/>} />
                <Route path="albums/:id" element={<AlbumPage/>} />
                <Route path="artists" element={<Artists/>} />  
                <Route path="artists/:id" element={<ArtistPage/>} />             
              </Route>
        </Routes> }
    </div>
  )
}

export default App