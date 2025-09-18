import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleSong} from '../utils/requests';
import { isMobile } from '../utils/genFuncs';

import Loader from './tools/Loader';
import "./SongPage.css";
import {Link} from 'react-router-dom';
import YouTubePlayer from './tools/YouTubePlayer';
import SpotifyPlayer from './tools/SpotifyPlayer';

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
                <div className="cell" ><img src={img_obj.url} alt={songInfo.album.name} /></div>
                  <div className="cell" ><span className="song-name">Song: {songInfo.name}</span></div>
                  <div className="cell"><span className="song-album-name">Album Name: </span></div>
                  <div className="cell"><Link to={`/library/albums/${songInfo.album.id}`}><span className="song-album-name">{songInfo.album.name}</span></Link></div>
                  <div className="cell"><span className="song-artists">Artists:</span></div>
                  <div className="cell">
                        <ul>
                            { songInfo.artists.map ( (artist) =><li key={artist.id}><Link to={`/library/artists/${artist.id}`} ><span className="song-artists">{artist.name}</span></Link></li> )}
                          </ul>
                  </div>
                  <div className="cell">
                    Play on Spotify
                  </div>
                  
                  <div className="cell">
                      {songInfo.accessToken && (
                        <SpotifyPlayer
                          trackUri={`spotify:track:${paramsObj.id}`}
                          token={songInfo.accessToken}
                        />
                      )}
                    </div>


                { /* <div className="cell">  token={songInfo.accessToken}
                     YouTube
                  </div>
                  <div className="cell">
                   
                     <YouTubePlayer videoId={songInfo.youTubeVideoId} />
                  </div> */}
                   { /*<a href={`https://www.youtube.com/watch?v=${songInfo.youTubeVideoId}`} target="_blank" rel="noopener noreferrer" >Watch on YouTube </a> */}
            </div>
            
           
         
           </div>      
     </>
    
  )
}

export default SongPage