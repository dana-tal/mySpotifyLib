import {  getArtistsList } from '../utils/requests';
import { useEffect, useState } from 'react';

function Artists(props) {

   const [artists, setArtists] = useState([]);


 useEffect(() => {
    const fetchArtists = async () => {
      try 
      {
        const myArtists = await getArtistsList(50,0);
        setArtists(myArtists.artists.items);
      } 
      catch (err) 
      {
        console.error('Error fetching data', err);
      }
    };

    fetchArtists();
  }, [props.isLogged]);


  return (
    <div>
       <h1 style={{color:"orange"}}> Artists</h1>
       <ul>
          { artists.map (  artist => <li key={ artist.id}>{artist.name}</li>)}
       </ul>
    </div>
  )
}

export default Artists