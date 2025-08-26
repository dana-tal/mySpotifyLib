import { getAlbumsGroup} from '../utils/requests';
import { useEffect, useState } from 'react';

function Albums(props) {

  const [albums, setAlbums] = useState([]);

  
 useEffect(() => {
    const fetchAlbums = async () => {
      try 
      {
        const myAlbums = await getAlbumsGroup(50,0);
        setAlbums(myAlbums.items);
      } 
      catch (err) 
      {
        console.error('Error fetching data', err);
      }
    };

    fetchAlbums();
  }, [props.isLogged]);


  return (
    <div>
        <h1 style={{ color:"blue"}}>Albums</h1>
        <ul>
            { albums.map ( item => {
                
                return <li key={item.album.id}> { item.album.name } - {item.album.artists[0].name}</li>
                } ) } 
        </ul>
    </div>
  )
}



export default Albums