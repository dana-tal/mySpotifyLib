import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleArtist} from '../utils/requests';
import { shortenString } from '../utils/genFuncs';
import MouseHoverPopover from './tools/MouseHoverPopover';
import MouseHoverList from './tools/MouseHoverList';
import ShortList from './tools/ShortList';
import ImagesGroup from './tools/ImagesGroup';

import Loader from './tools/Loader';
import "./ArtistPage.css";

function ArtistPage() {

    const paramsObj = useParams();
    const [artistInfo, setArtistInfo] = useState({});
    const [displayTop,setDisplayTop] = useState(false); // a boolean flag - display or don't display the top ten songs of this artist 

     const handleClick = ()=>{
          
      setDisplayTop( (prevDisplayTop)=>{  return !prevDisplayTop; })
    }


    useEffect( ()=>{

      const fetchArtist= async (artistId)=>{

         try
         {
          const resp = await getSingleArtist(artistId);
          setArtistInfo(resp);
         }
         catch (err) 
         {
            console.error('Error fetching single artist data', err);
          }
      }

      fetchArtist(paramsObj.id);

    },[paramsObj.id])


    
     if (!artistInfo.name) return <Loader />;
    // const is_mobile  =  isMobile();
    
     // const img_obj =is_mobile ?  artistInfo.images[2]:artistInfo.images[1]; 

       const img_obj = artistInfo.images[1]; 

  return (

    <>        
           <div className="artist-frame">
            <div className="artist-grid-table">
            
                <div className="artist-cell" >
                   { 
                   displayTop? <div onClick={handleClick}><ShortList title="Top Ten Songs" listItems={artistInfo.top_ten_songs} width={img_obj.width} height={img_obj.height} /></div> :                    
                    <MouseHoverList list={artistInfo.more_albums} title={`More Albums Of ${artistInfo.name}`}>
                      <img className="artistImage" src={img_obj?.url} alt={artistInfo.name} onClick={handleClick}/>
                    </MouseHoverList>
                  }
                </div>
                  <div className="artist-cell" >
                    <div style={{ display:"flex", flexDirection:"column" }}>
                       <span>Artist: </span>
                       <MouseHoverPopover hoverText={artistInfo.name}>
                              <span className="artist-name artist-font"> {shortenString(artistInfo.name,21)}</span>
                      </MouseHoverPopover>
                     </div>
                  </div>

                  <div className="artist-cell"><span>Followers Total: </span></div>
                  <div className="artist-cell"><span >{artistInfo.followers.total}</span></div>
                  
                  <div className="artist-cell"><span>Popularity: </span></div>
                  <div className="artist-cell"><span >{artistInfo.popularity}</span></div>

                  <div className="artist-cell"><span>Genres: </span></div>
                  <div className="artist-cell">
                       {artistInfo.genres.length >0 && <ul>
                                 { artistInfo.genres.map( (gen) => <li id={gen}>{gen}</li>) }
                       </ul>}
                       { artistInfo.genres.length===0 && <span>N.A</span>

                       }
                  </div>

                   <div className="album-cell full-width"  style={{ backgroundColor:"#D1BEA8",  color:"#513B1C"}}><span className="album-font">More Albums of {artistInfo.name}</span></div>     
                   <div className="album-cell full-width"   style={{ backgroundColor:"#F8F6F0"}}>
                     <ImagesGroup list={artistInfo.spotify_more_albums} itemType="album" />                                         
                  </div> 

            </div>
           </div>      
     </>
    
  )
}

export default ArtistPage