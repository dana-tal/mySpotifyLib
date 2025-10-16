import { useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import { getSingleSong} from '../utils/requests';
import { shortenString } from '../utils/genFuncs';
import MouseHoverPopover from './tools/MouseHoverPopover';
import MouseHoverList from './tools/MouseHoverList';
import ShortList from './tools/ShortList';

import Loader from './tools/Loader';
import "./SongPage.css";
import {Link} from 'react-router-dom';
import YouTubePlayer from './tools/YouTubePlayer';
import SpotifyPlayer from './tools/SpotifyPlayer';
import SongListItem from './SongListItem';
import ImagesGroup from './tools/ImagesGroup';


function SongPage() {

    const paramsObj = useParams();
    const [songInfo, setSongInfo] = useState({});
    const [displayTop,setDisplayTop] = useState(false);

    const handleClick = ()=>{
          
      setDisplayTop( (prevDisplayTop)=>{  return !prevDisplayTop; })
    }

    useEffect( ()=>{

      const fetchSong= async (songId)=>{

         try
         {
          const resp = await getSingleSong(songId);
          console.log("resp:");
          console.log(resp);
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
    
     const img_obj = songInfo.album.images[1]; 

     console.log("Top Tracks");
     console.log( songInfo.spotifyTopTracks);
  
  return (

    <>        
           <div className="song-frame ">
            <div className="song-grid-table">
                <div className="cell" >
                
                   { displayTop? <div onClick={handleClick}><ShortList title="Top Ten Songs" listItems={songInfo.top_ten} width={img_obj.width} height={img_obj.height} /></div> :
                        <MouseHoverList list={songInfo.more_songs} >
                          <img src={img_obj?.url} alt={songInfo.album.name} onClick={handleClick } /> 
                        </MouseHoverList>
                   }
                 
      </div>            
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


                  <div className="cell song-font">
                     YouTube Video:
                  </div>
                  <div className="cell">      
                     <YouTubePlayer videoId={songInfo.youTubeVideoId} />
                  </div> 


                  <div className="cell full-width ">
                     <ImagesGroup list={songInfo.spotifyTopTracks} itemType="song" />   
                    {/*    
                     <div className="spotifyTopContainer"> 
                       { songInfo.spotifyTopTracks.length > 0 &&
                            songInfo.spotifyTopTracks.map(item => {
                              const my_obj = item.track ? item.track : item;
                            
                              return (
                                <div className="spotifyTopItem">
                                <Link key={my_obj.id} to={`/library/songs/${my_obj.id}`} className="list-item-link">
                                     <img src={my_obj.album.images[1].url} alt={my_obj.name} style={{ width:"150px", height:"150px"}} />
                                </Link>
                                </div>
                              );
                            })
                          }
                    </div>
                    */}
                    
                  </div> 
            </div>
            
           
         
           </div>      
     </>
    
  )
}

export default SongPage