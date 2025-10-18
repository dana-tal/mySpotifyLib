import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleAlbum} from '../utils/requests';
import {  shortenString } from '../utils/genFuncs';
import MouseHoverPopover from './tools/MouseHoverPopover';
import MouseHoverList from './tools/MouseHoverList';

import Loader from './tools/Loader';
import "./AlbumPage.css";
import {Link} from 'react-router-dom';
import ShortList from './tools/ShortList';
import ImagesGroup from './tools/ImagesGroup';

function AlbumPage() {

    const paramsObj = useParams();
    const [albumInfo, setAlbumInfo] = useState({});

    const [displayTop,setDisplayTop] = useState(false); // a boolean flag - display or don't display the top ten albums of this artist 

    const handleClick = ()=>{
          
      setDisplayTop( (prevDisplayTop)=>{  return !prevDisplayTop; })
    }

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
      const mid = Math.floor(albumInfo.tracks.total/2);

  
      // slice into two halves
      const firstHalf =  albumInfo.tracks.items.slice(0, mid);
      const lastHalf =  albumInfo.tracks.items.slice(mid);

  return (

    <>        
           <div className="album-frame">
            <div className="album-grid-table">
             
                <div className="album-cell" >
                  {
                    displayTop? <div onClick={handleClick}><ShortList title="Top Ten Albums" listItems={albumInfo.top_ten_albums} width={img_obj.width} height={img_obj.height} /></div> :
                    <MouseHoverList list={albumInfo.more_albums} title={`More Albums of ${albumInfo.artists[0].name}`}>
                      <img src={img_obj?.url} alt={albumInfo.name} className="album-image" onClick={handleClick }/> 
                    </MouseHoverList>
                  }
                  
                </div>
                {/*  <MouseHoverList list={songInfo.more_songs} >
                                          <img src={img_obj?.url} alt={songInfo.album.name} onClick={handleClick } /> 
                                        </MouseHoverList> */}
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
                 
                  <div className="album-cell full-width"><span className="album-font">Tracks: [{albumInfo.tracks.total}]</span></div>                   
                  <div className="album-cell" style={{ backgroundColor:"#F8F6F0"}}>
                      <ul>
                            { firstHalf.map ( (item) =>
                                                             <li key={item.id} className="album-track-name">
                                                                <Link to={`/library/songs/${item.id}`}  className="album-font album-track" >
                                                                   <MouseHoverPopover hoverText={item.name}>
                                                                      <span className="album-font">{shortenString(item.name,21)}</span>
                                                                  </MouseHoverPopover>
                                                                </Link>
                                                              </li> )}
                          </ul>

                  </div>
                  
                  <div className="album-cell">
                        <ul>
                            { lastHalf.map ( (item) =>
                                                             <li key={item.id} className="album-track-name">
                                                                <Link to={`/library/songs/${item.id}`}  className="album-font album-track" >
                                                                   <MouseHoverPopover hoverText={item.name}>
                                                                      <span className="album-font">{shortenString(item.name,21)}</span>
                                                                  </MouseHoverPopover>
                                                                </Link>
                                                              </li> )}
                          </ul>
                  </div>
                    <div className="album-cell full-width"  style={{ backgroundColor:"#D1BEA8",  color:"#513B1C"}}><span className="album-font">More Albums of {albumInfo.artists[0].name}</span></div>     
                   <div className="album-cell full-width"   style={{ backgroundColor:"#F8F6F0"}}>
                     <ImagesGroup list={albumInfo.spotify_more_albums} itemType="album" />                                         
                  </div>            
            </div>
           </div>      
     </>
    
  )
}

export default AlbumPage