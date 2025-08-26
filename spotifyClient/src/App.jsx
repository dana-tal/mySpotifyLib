import Library from './components/Library';
import {Route,Routes} from 'react-router-dom'
import { useEffect, useState } from 'react';

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;



function App() {
  
  const [ isLogged, setIsLogged ] = useState(false);
 
    useEffect(() => {
    const loginResp = new URLSearchParams(window.location.search).get('login');
    if (loginResp !== 'success') return;
    setIsLogged(true); 

  }, []);



  return (
    <>
        
     { isLogged === false  && <a href={`${DOMAIN}/auth/login`}>
                                  <button>Login with Spotify  22</button>
                              </a> 
      }
      { isLogged===true && <Library/>} 
     
    </>
  )
}

export default App
