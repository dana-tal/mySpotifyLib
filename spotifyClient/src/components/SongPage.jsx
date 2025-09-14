import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleSong} from '../utils/requests';
import { isMobile } from '../utils/genFuncs';

import Loader from './tools/Loader';
import "./SongPage.css";

function SongPage() {

    const paramsObj = useParams();
    const [songInfo, setSongInfo] = useState({});



    useEffect( ()=>{

      const fetchSong= async (songId)=>{

         try
         {
          const resp = await getSingleSong(songId);
          setSongInfo(resp);
         }
         catch (err) 
         {
            console.error('Error fetching single song data', err);
          }
      }

      fetchSong(paramsObj.id);

    },[paramsObj.id])


    
     if (!songInfo.album) return <Loader />;
     const is_mobile  =  isMobile();
     console.log("is mobile:");
     console.log(is_mobile);

      const img_obj =is_mobile ?  songInfo.album.images[2]:songInfo.album.images[1]; 

  return (

    <>        
           <div className="frame">
            <div className="grid-table">
              { /* <div className="cell">1</div><div className="cell">2</div> */}
                <div className="cell" ><img src={img_obj.url} alt={songInfo.album.name} /></div>
                  <div className="cell" ><span className="song-name">{songInfo.name}</span></div>
                  <div className="cell"><span className="song-album-name">Album Name: </span></div>
                  <div className="cell"><span className="song-album-name">{songInfo.album.name}</span></div>
                  <div className="cell"><span className="song-artists">Artists:</span></div>
                  <div className="cell">
                        <ul>
                            { songInfo.artists.map ( (artist) =><li key={artist.id}><span className="song-artists">{artist.name}</span></li> )}
                          </ul>
                  </div>
              
            </div>
           </div>      
     </>
    
  )
}

export default SongPage