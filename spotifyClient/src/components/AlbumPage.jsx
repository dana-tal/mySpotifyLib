import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleAlbum} from '../utils/requests';
import { isMobile } from '../utils/genFuncs';

import Loader from './tools/Loader';
import "./AlbumPage.css";
import {Link} from 'react-router-dom';

function AlbumPage() {

    const paramsObj = useParams();
    const [albumInfo, setAlbumInfo] = useState({});



    useEffect( ()=>{

      const fetchAlbum= async (albumId)=>{

         try
         {
          const resp = await getSingleAlbum(albumId);
          setAlbumInfo(resp);
         }
         catch (err) 
         {
            console.error('Error fetching single album data', err);
          }
      }

      fetchAlbum(paramsObj.id);

    },[paramsObj.id])


    
     if (!albumInfo.name) return <Loader />;
     const is_mobile  =  isMobile();
     console.log("is mobile:");
     console.log(is_mobile);

      const img_obj =is_mobile ?  albumInfo.images[2]:albumInfo.images[1]; 

  return (

    <>        
           <div className="frame">
            <div className="grid-table">
             
                <div className="cell" ><img src={img_obj.url} alt={albumInfo.name} /></div>
                  <div className="cell"><span className="album-name">{albumInfo.name}</span></div>
                  <div className="cell"><span className="artists">Artists:</span></div>
                  <div className="cell">
                        <ul>
                            { albumInfo.artists.map ( (artist) =><li key={artist.id}><span className="artists">{artist.name}</span></li> )}
                          </ul>
                  </div>
                  <div className="cell"><span className="tracks">Tracks: [{albumInfo.tracks.total}]</span></div>
                  <div className="cell">
                        <ul>
                            { albumInfo.tracks.items.map ( (item) =><li key={item.id}><Link to={`/library/songs/${item.id}`}><span className="tracks">{item.name}</span></Link></li> )}
                          </ul>
                  </div>
              
            </div>
           </div>      
     </>
    
  )
}

export default AlbumPage