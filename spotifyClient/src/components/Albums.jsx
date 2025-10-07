import { useState,useCallback } from 'react';
import {Link} from 'react-router-dom';
import ListContainer from './tools/ListContainer';
import SearchContainer from './tools/SearchContainer';
import Loader from './tools/Loader';
import AlbumListItem from './AlbumListItem';
import { getAlbumsGroup,getAlbumsSearchResult} from '../utils/requests';
import useSearchState from './custom_hooks/useSearchState';

const ALBUMS_PER_PAGE = import.meta.env.VITE_ALBUMS_PER_PAGE;

import "./List.css";


function Albums() {

  const storageKey = "albums";
  
  //use useSearchState hook 
   const { mode, searchType, searchTerm, onModeChange, onSearchChange } = useSearchState(storageKey);
  
  const [albums, setAlbums] = useState([]);
  const [ status, setStatus] = useState("loading")
  const [ errMsg, setErrMsg] = useState(null);

  
  const handleSearchSubmit = (newSearchType, newSearchTerm) =>{
           setStatus("loading");
           onSearchChange(newSearchType,newSearchTerm);
  }

  const fetchAlbums = useCallback( async (pageNum,mode,searchType,searchTerm) => {
      try 
      {           
        let myAlbums;
        if (mode==='normal')
        {
            myAlbums = await getAlbumsGroup(ALBUMS_PER_PAGE,pageNum);
        }
        else // we are in search mode
        {
            myAlbums = await getAlbumsSearchResult(ALBUMS_PER_PAGE,pageNum,searchType,searchTerm);             
        }
        setAlbums(myAlbums.items);
        setStatus("success");
        return ( {total: myAlbums.total} );
      } 
      catch (err) 
      {
        console.error('In fetchAlbums, Error fetching albums', err);
        setStatus("error");
        setErrMsg(err);
         return ( {total:0} );
      }
    },[]);



  return ( 
             <div style={{ textAlign:"center" }}>
                 <h1 style={{ color:"#654321"}}>My Albums</h1> 
                   <SearchContainer
                      mode={mode}
                      searchType={searchType}
                      searchTerm={searchTerm}
                      onModeChange={onModeChange}
                      onSearchChange={handleSearchSubmit}
                    />

                  <ListContainer   
                    fetchFunc={fetchAlbums} 
                    perPage={ALBUMS_PER_PAGE} 
                    storageKey={storageKey}
                    mode={mode}
                    searchType={searchType}
                    searchTerm={searchTerm}
                    >
                            { status==='loading' && <Loader />}
                            { status==='success' &&  albums.length >0 && albums.map( item => { 
                              const my_album = item.album ? item.album : item ;
                              return <Link key={my_album.id}  to={`${my_album.id}`} className="list-item-link"> <AlbumListItem   item={my_album}/></Link> })}
                            
                            { status==='success' && albums.length ===0 && 
                                  <span>No Albums Found</span>
                              }
                            { status ==='error' &&   <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
                  </ListContainer>
              </div>
  );
}

export default Albums