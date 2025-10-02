import { getSongsGroup, getSongsSearchResult} from '../utils/requests';
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
  
  const fetchSongs = useCallback( async (pageNum,mode,searchType,searchTerm) => 
   {
      try {
            let mySongs; 
            if (mode === 'normal')
            {
                mySongs = await getSongsGroup(SONGS_PER_PAGE,pageNum);
            }
            else // we are in search mode
            {
               mySongs = await getSongsSearchResult(SONGS_PER_PAGE,pageNum,searchType,searchTerm);
               //console.log("in fetchSongs, response:");
               //console.log(mySongs);
            }
          
          //console.log(mySongs);
          setTracks(mySongs.items);          
          setStatus("success");
          return ( {total: mySongs.total} );

      } 
      catch (err) 
      {
        console.error('In fetchSongs, Error fetching data', err);
        setStatus("error");
        setErrMsg(err);
         return ( {total: 0} );
      }
    },[]);

    /* <Link to={`${item.track.id}`} > */

  return (<ListContainer title="My Songs"  fetchFunc={fetchSongs} perPage={SONGS_PER_PAGE} storageKey="songs">
        { status==='loading' && <Loader />}
         { status==='success' && tracks.length >0 && tracks.map( item => {  
            const my_obj = item.track ? item.track : item ;
            return <Link key={my_obj.id}  to={`${my_obj.id}`} className="list-item-link"><SongListItem  item={item}/></Link> })}
         { status==='success' && tracks.length ===0 && 
            <span>There are no songs in your library yet </span>
         }
         { status==='error' && <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
  </ListContainer>)
  
}

export default Songs