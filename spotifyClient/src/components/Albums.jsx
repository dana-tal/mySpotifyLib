import { getAlbumsGroup,getAlbumsSearchResult} from '../utils/requests';
import { useState,useCallback } from 'react';
import AlbumListItem from './AlbumListItem';
import Loader from './tools/Loader';
import ListContainer from './tools/ListContainer';
import {Link} from 'react-router-dom';
import "./List.css";

const ALBUMS_PER_PAGE = import.meta.env.VITE_ALBUMS_PER_PAGE;

function Albums() {

  const [albums, setAlbums] = useState([]);
  const [ status, setStatus] = useState("loading")
  const [ errMsg, setErrMsg] = useState(null);

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
        console.error('In fetchAlbums, Error fetching data', err);
        setStatus("error");
        setErrMsg(err);
         return ( {total:0} );
      }
    },[]);



  return ( <ListContainer title="My Albums"  fetchFunc={fetchAlbums} perPage={ALBUMS_PER_PAGE} storageKey="albums">
            { status==='loading' && <Loader />}
            { status==='success' &&  albums.length >0 && albums.map( item => { 
              const my_album = item.album ? item.album : item ;
              return <Link key={my_album.id}  to={`${my_album.id}`} className="list-item-link"> <AlbumListItem   item={my_album}/></Link> })}
            
            { status==='success' && albums.length ===0 && 
                  <span>There are no albums in your library yet</span>
              }
            { status ==='error' &&   <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
  </ListContainer>);

}

export default Albums