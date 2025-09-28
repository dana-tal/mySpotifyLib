import YouTube from "react-youtube";
import { useState } from "react";
import "./YouTubePlayer.css";

const YouTubePlayer =({videoId, height_param="360", width_param="640", autoPlay_param=0})=> 
{
      const [error, setError] = useState(false);
      const [ready, setReady] = useState(false);
    
       const handleError = (event) => {
             console.warn("YouTube Player Error:", event.data);
             setError(true);
             
         };
    
      const handleReady = () => {
          setReady(true);
      };


    if (!videoId) 
        return <p>No video available</p>;

     const opts = 
     {
       /* height: height_param,
        width:  width_param, */
        playerVars: 
        {
            autoplay: autoPlay_param,
        },
    } ;

  
    return <>
                {!error && !ready && <p className="youTube-font">Loading video...</p>}
               { error && <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="youTube-font">Watch on YouTube </a>}
               { !error && <div className="youtube-wrapper"><YouTube  className="youtube-iframe" videoId={videoId} opts={opts} onError={handleError}  onReady={handleReady} style={{ display: ready ? "block" : "none" }} /></div>}
    </>
    
}

export default YouTubePlayer