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
  const [ status, setStatus] = useState("loading");   // "loading", "success", "error"
  const [ errMsg, setErrMsg] = useState(null);
  
  const fetchSongs = useCallback( async (pageNum) => 
   {
      try {
           
          const mySongs = await getSongsGroup(SONGS_PER_PAGE,pageNum);
          //console.log(mySongs);
          setTracks(mySongs.items);          
          setStatus("success");
          return ( {total: mySongs.total} );

      } 
      catch (err) 
      {
        console.error('Error fetching data', err);
        setStatus("error");
        setErrMsg(err);
         return ( {total: 0} );
      }
    },[]);

    /* <Link to={`${item.track.id}`} > */

  return (<ListContainer title="My Songs"  fetchFunc={fetchSongs} perPage={SONGS_PER_PAGE}>
        { status==='loading' && <Loader />}
         { status==='success' && tracks.length >0 && tracks.map( item => <Link key={item.track.id}  to={`${item.track.id}`} className="list-item-link"><SongListItem  item={item}/></Link>)}
         { status==='success' && tracks.length ===0 && 
            <span>There are no songs in your library yet </span>
         }
         { status==='error' && <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
  </ListContainer>)
  
}

export default Songs