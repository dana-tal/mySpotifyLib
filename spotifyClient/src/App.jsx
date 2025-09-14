import Welcome from './components/Welcome';
import Library from './components/Library';
import {Route,Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Songs from './components/Songs';
import SongPage from './components/SongPage';
import Albums from './components/Albums';
import Artists from './components/Artists';
import AlbumPage from './components/AlbumPage';

function App() {
  
  const navigate = useNavigate();
  
    useEffect(() => {
    const loginResp = new URLSearchParams(window.location.search).get('login');
    if (loginResp !== 'success') return;
    navigate("/library/songs");

  }, []);

  return (
    <div >

        <Routes>
              <Route path="/" element={ <Welcome /> } />
              <Route path="/library" element={<Library/>} >
                <Route path="songs" element={<Songs/>} />
                <Route path="songs/:id" element={<SongPage/>} />   
                <Route path="albums" element={<Albums/>} />
                <Route path="albums/:id" element={<AlbumPage/>} />
                <Route path="artists" element={<Artists/>} />               
              </Route>
        </Routes>
    </div>
  )
}

export default App