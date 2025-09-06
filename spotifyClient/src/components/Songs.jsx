import { getSongsGroup} from '../utils/requests';
import { useState ,useCallback} from 'react';
import SongListItem from './SongListItem';
import Loader from './tools/Loader';
import ListContainer from './tools/ListContainer';


const SONGS_PER_PAGE = import.meta.env.VITE_SONGS_PER_PAGE;

function Songs() {

  const [tracks, setTracks] = useState([]);
  
  const fetchSongs = useCallback( async (pageNum) => 
   {
      try {
           
          const mySongs = await getSongsGroup(SONGS_PER_PAGE,pageNum);
          setTracks(mySongs.items);          
          return ( {total: mySongs.total} );

      } catch (err) {
        console.error('Error fetching data', err);
         return ( {total: 0} );
      }
    },[]);


  return (<ListContainer title="My Songs"  fetchFunc={fetchSongs} perPage={SONGS_PER_PAGE}>
         { tracks.length >0 && tracks.map( item => <SongListItem key={item.id}  item={item}/>)}
         { tracks.length ===0 && 
            <Loader />
         }
  </ListContainer>)
  
}

export default Songs