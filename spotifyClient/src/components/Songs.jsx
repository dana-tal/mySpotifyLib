import { getSongsGroup} from '../utils/requests';
import { useState ,useCallback} from 'react';
import SongListItem from './SongListItem';
import Loader from './tools/Loader';
import ListContainer from './tools/ListContainer';
import {Link} from 'react-router-dom';
import "./List.css";

const SONGS_PER_PAGE = import.meta.env.VITE_SONGS_PER_PAGE;

function Songs() {

  const [tracks, setTracks] = useState([]);
  
  const fetchSongs = useCallback( async (pageNum) => 
   {
      try {
           
          const mySongs = await getSongsGroup(SONGS_PER_PAGE,pageNum);
          console.log(mySongs);
          setTracks(mySongs.items);          
          return ( {total: mySongs.total} );

      } catch (err) {
        console.error('Error fetching data', err);
         return ( {total: 0} );
      }
    },[]);

    /* <Link to={`${item.track.id}`} > */

  return (<ListContainer title="My Songs"  fetchFunc={fetchSongs} perPage={SONGS_PER_PAGE}>
         { tracks.length >0 && tracks.map( item => <Link key={item.track.id}  to={`${item.track.id}`} className="list-item-link"><SongListItem  item={item}/></Link>)}
         { tracks.length ===0 && 
            <Loader />
         }
  </ListContainer>)
  
}

export default Songs