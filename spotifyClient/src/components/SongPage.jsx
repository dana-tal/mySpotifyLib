import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleSong} from '../utils/requests';
import { isMobile,shortenString } from '../utils/genFuncs';
import MouseHoverPopover from './tools/MouseHoverPopover';

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

     // const img_obj =is_mobile ?  songInfo.album.images[2]:songInfo.album.images[1]; 
     const img_obj = songInfo.album.images[1]; 
    //  console.log("images");
    //  console.log(songInfo.album.images );

  return (

    <>        
           <div className="song-frame ">
            <div > {/*<!-- className="song-grid-table" --> */}
                <div className="cell" ><img src={img_obj.url} alt={songInfo.album.name} /></div>
                  <div className="cell" ><MouseHoverPopover hoverText={songInfo.name}><span className="song-font">Song:</span><span className="song-name song-font"> {shortenString(songInfo.name,21) }</span></MouseHoverPopover></div>
                  <div className="cell"><span className="song-album-name song-font">Album Name: </span></div>
                  <div className="cell"><Link to={`/library/albums/${songInfo.album.id}`}><MouseHoverPopover hoverText={songInfo.album.name}><span className="song-album-name song-font">{shortenString(songInfo.album.name,21)}</span></MouseHoverPopover></Link></div>
                  <div className="cell"><span className="song-label song-font">Artists:</span></div>
                  <div className="cell">
                        <ul>
                            { songInfo.artists.map ( (artist) =><li key={artist.id}><Link to={`/library/artists/${artist.id}`} ><MouseHoverPopover hoverText={artist.name}><span className="song-artists song-font">{shortenString(artist.name,21) }</span></MouseHoverPopover></Link></li> )}
                          </ul>
                  </div>
                  <div className="cell">
                    <span className="song-font">Play on Spotify:</span>
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