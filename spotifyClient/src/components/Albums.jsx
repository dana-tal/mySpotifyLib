import { getAlbumsGroup} from '../utils/requests';
import { useState,useCallback } from 'react';
import AlbumListItem from './AlbumListItem';
import Loader from './tools/Loader';
import ListContainer from './tools/ListContainer';
import {Link} from 'react-router-dom';
import "./List.css";

const ALBUMS_PER_PAGE = import.meta.env.VITE_ALBUMS_PER_PAGE;

function Albums() {

  const [albums, setAlbums] = useState([]);
  

  const fetchAlbums = useCallback( async (pageNum) => {
      try 
      {           
        const myAlbums = await getAlbumsGroup(ALBUMS_PER_PAGE,pageNum);
        setAlbums(myAlbums.items);
        return ( {total: myAlbums.total} );
      } 
      catch (err) 
      {
        console.error('Error fetching data', err);
         return ( {total:0} );
      }
    },[]);

  return ( <ListContainer title="My Albums"  fetchFunc={fetchAlbums} perPage={ALBUMS_PER_PAGE}>
            { albums.length >0 && albums.map( item => <Link key={item.album.id}  to={`${item.album.id}`} className="list-item-link"> <AlbumListItem   item={item}/></Link>)}
            { albums.length ===0 && 
                  <Loader />
              }
  </ListContainer>);

}

export default Albums