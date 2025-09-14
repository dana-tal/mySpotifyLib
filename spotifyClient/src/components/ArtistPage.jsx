import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleArtist} from '../utils/requests';
import { isMobile } from '../utils/genFuncs';

import Loader from './tools/Loader';
import "./ArtistPage.css";

function SongPage() {

    const paramsObj = useParams();
    const [artistInfo, setArtistInfo] = useState({});



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
     const is_mobile  =  isMobile();
     console.log("is mobile:");
     console.log(is_mobile);

      const img_obj =is_mobile ?  artistInfo.images[2]:artistInfo.images[1]; 

  return (

    <>        
           <div className="frame">
            <div className="grid-table">
            
                <div className="cell" ><img src={img_obj.url} alt={artistInfo.name} /></div>
                  <div className="cell" ><span className="artist-name">{artistInfo.name}</span></div>

                  <div className="cell"><span>Followers Total: </span></div>
                  <div className="cell"><span >{artistInfo.followers.total}</span></div>
                  
                  <div className="cell"><span>Popularity: </span></div>
                  <div className="cell"><span >{artistInfo.popularity}</span></div>

                  <div className="cell"><span>Genres: </span></div>
                  <div className="cell">
                       {artistInfo.genres.length >0 && <ul>
                                 { artistInfo.genres.map( (gen) => <li id={gen}>{gen}</li>) }
                       </ul>}
                       { artistInfo.genres.length===0 && <span>N.A</span>

                       }
                  </div>

            </div>
           </div>      
     </>
    
  )
}

export default SongPage