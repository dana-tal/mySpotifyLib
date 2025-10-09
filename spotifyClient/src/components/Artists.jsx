import { useState,useCallback } from 'react';
import {Link} from 'react-router-dom';
import ListContainer from './tools/ListContainer';
import SearchContainer from './tools/SearchContainer';
import Loader from './tools/Loader';
import ArtistListItem from './ArtistListItem';
import {  getArtistsList,getArtistsSearchResult } from '../utils/requests';
import useSearchState from './custom_hooks/useSearchState';
import CursorListContainer from './tools/CursorListContainer';

import "./List.css";


const ARTISTS_PER_PAGE =  import.meta.env.VITE_ARTISTS_PER_PAGE;


function Artists(props) {

  const storageKey = "artists";
  
  // useSearchState hook
  const { mode, searchType, searchTerm, onModeChange, onSearchChange } = useSearchState(storageKey);
  
  const [artists, setArtists] = useState([]);
  const [ status, setStatus] = useState("loading");   // "loading", "success", "error"
  const [ errMsg, setErrMsg] = useState(null);
 

  const handleSearchSubmit = (newSearchType, newSearchTerm) =>{
           setStatus("loading");
           onSearchChange(newSearchType,newSearchTerm);
  }

  // async (pageNum,mode,searchType,searchTerm) 

  const fetchArtistsSearchResponse = useCallback ( async (pageNum,mode,searchType,searchTerm) => {
      try
      {
          const resp = await getArtistsSearchResult(ARTISTS_PER_PAGE,pageNum,searchType,searchTerm);
          setArtists(resp.items); 
          setStatus('success');
           return ( {total: resp.total} );
      }
      catch (err) 
      {
          console.error('fetchArtistsSearchResponse, Error fetching data', err);
          setStatus('error');
          setErrMsg(err);
          return ( {total: 0} );
      }
      
  },[]);

// in spotify get followed artists api,  after means The cursor to use as key to find the next page of items.
  const fetchArtists = useCallback( async (after=null) => 
   {
      try {
            const resp = await getArtistsList(ARTISTS_PER_PAGE,after); 
            setArtists(resp.artists.items);  
            setStatus('success');
            return ( { cursors : resp.artists.cursors} );
        } 
        catch (err) 
        {
          console.error('fetchArtists, Error fetching data', err);
          setStatus('error');
          setErrMsg(err);
          return ( {cursors: null} );
        }
    },[]);


  return (
  <div style={{ textAlign:"center"}}>
     <h1 style={{ color: "#654321" }}>My Artists</h1>
      <SearchContainer
        mode={mode}
        searchType={searchType}
        searchTerm={searchTerm}
        onModeChange={onModeChange}
        onSearchChange={handleSearchSubmit}
      />
   {mode==='normal' && <CursorListContainer   fetchFunc={fetchArtists} storageKey="artists">
           { status==='loading' && <Loader />}
         { status==='success' && artists.length >0 && artists.map( item =>  <Link key={item.id}  to={`${item.id}`} className="list-item-link"><ArtistListItem   item={item}/></Link>)}
         { status==='success' && artists.length ===0 &&         
            <span>No Artists Found</span>
         }
          { status==='error' && <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
  </CursorListContainer> }
   { mode==='search' && 
      <ListContainer   
                    fetchFunc={fetchArtistsSearchResponse} 
                    perPage={ARTISTS_PER_PAGE} 
                    storageKey={storageKey}
                    mode={mode}
                    searchType={searchType}
                    searchTerm={searchTerm}
                    >
                            { status==='loading' && <Loader />}
                            { status==='success' &&  artists.length >0 && artists.map( item => { 
                              const my_artist = item.artist ? item.artist : item ;
                              return <Link key={my_artist.id}  to={`${my_artist.id}`} className="list-item-link"> <ArtistListItem   item={my_artist}/></Link> })}
                            
                            { status==='success' && artists.length ===0 && 
                                  <span>No Artists Found</span>
                              }
                            { status ==='error' &&   <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
                  </ListContainer>
   }

  </div>
  )
        
}

export default Artists