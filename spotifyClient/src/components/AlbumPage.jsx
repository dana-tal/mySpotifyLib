import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleAlbum} from '../utils/requests';
import {  shortenString } from '../utils/genFuncs';
import MouseHoverPopover from './tools/MouseHoverPopover';

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
   
      const img_obj =albumInfo.images[1]; 

  return (

    <>        
           <div className="album-frame">
            <div className="album-grid-table">
             
                <div className="album-cell" >{<img src={img_obj?.url} alt={albumInfo.name} className="album-image"/> }</div>
                  <div className="album-cell">
                    <div style={{ display:"flex", flexDirection:"column" }}>
                        <span className="album-font">Album: </span>
                         <MouseHoverPopover hoverText={albumInfo.name}>
                            <span className="album-font">{shortenString(albumInfo.name,21)}</span>
                        </MouseHoverPopover>
                    </div>
                  </div>
                  <div className="album-cell"><span className="album-font">Artists:</span></div>
                  <div className="album-cell">
                        <ul>
                            { albumInfo.artists.map ( (artist) =><li key={artist.id}><Link to={`/library/artists/${artist.id}`}><span className="album-font">{artist.name}</span></Link></li> )}
                          </ul>
                  </div>
                  <div className="album-cell"><span className="album-font">Tracks: [{albumInfo.tracks.total}]</span></div>
                  <div className="album-cell">
                        <ul>
                            { albumInfo.tracks.items.map ( (item) =>
                                                             <li key={item.id} className="album-track-name">
                                                                <Link to={`/library/songs/${item.id}`}  className="album-font album-track" >
                                                                   <MouseHoverPopover hoverText={item.name}>
                                                                      <span className="album-font">{shortenString(item.name,21)}</span>
                                                                  </MouseHoverPopover>
                                                                </Link>
                                                              </li> )}
                          </ul>
                  </div>
              
            </div>
           </div>      
     </>
    
  )
}

export default AlbumPage