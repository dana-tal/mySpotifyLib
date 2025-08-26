import { getSongsGroup} from '../utils/requests';
import { useEffect, useState } from 'react';


function Songs(props) {

  const [tracks, setTracks] = useState([]);
  

 useEffect(() => {
    const fetchSongs = async () => {
      try {
   
        const mySongs = await getSongsGroup(5,0);
        setTracks(mySongs.items);

      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchSongs();
  }, [props.isLogged]);





  return (
    <div>
      <h1 style={{ color:"fuchsia"}} >Liked Songs</h1>
      <table>
        <thead>
             <th>Title</th>
             <th>Artist</th>
             <th>Album</th>
             <th>Date Added</th>
             <th>Duration</th>
        </thead>
         <tbody>
        { tracks.length >0 && tracks.map(item => (
          <tr key={item.track.id}>
             <td>{item.track.name}</td>
             <td>{item.track.artists[0].name}</td>
             <td>{item.track.album.name }</td>
             <td>{item.added_at}</td>
             <td>{item.track.duration_ms}</td>
          </tr>
        ))}
        
        </tbody>
      </table>
    </div>
  )
}

export default Songs