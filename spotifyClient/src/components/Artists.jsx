import {  getArtistsList } from '../utils/requests';
import { useState,useCallback } from 'react';
import ArtistListItem from './ArtistListItem';
import Loader from './tools/Loader';
import CursorListContainer from './tools/CursorListContainer';
import {Link} from 'react-router-dom';
import "./List.css";


const ARTISTS_PER_PAGE =  import.meta.env.VITE_ARTISTS_PER_PAGE;


function Artists(props) {

  const [artists, setArtists] = useState([]);
 
  const fetchArtists = useCallback( async (after=null, before=null) => 
   {
      try {
          const resp = await getArtistsList(ARTISTS_PER_PAGE,after,before);
          console.log("Response");
          console.log(resp);
          setArtists(resp.artists.items);  
          console.log("after value: "+resp.artists.cursors.after);
        //  console.log("before value: "+resp.artists.cursors.before);
          return ( { cursors : resp.artists.cursors} );

      } catch (err) {
        console.error('Error fetching data', err);
         return ( {cursors: null} );
      }
    },[]);


  return (<CursorListContainer title="My Followed Artists"  fetchFunc={fetchArtists} >
         { artists.length >0 && artists.map( item =>  <Link key={item.id}  to={`${item.id}`} className="list-item-link"><ArtistListItem   item={item}/></Link>)}
         { artists.length ===0 && 
            <Loader />
         }
  </CursorListContainer>)

}

export default Artists