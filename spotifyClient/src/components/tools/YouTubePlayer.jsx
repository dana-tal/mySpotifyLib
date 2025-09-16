import YouTube from "react-youtube";
import { useState } from "react";

const YouTubePlayer =({videoId, height_param="360", width_param="640", autoPlay_param=1})=> 
{
      const [error, setError] = useState(false);

       const handleError = (event) => {
             console.warn("YouTube Player Error:", event.data);
             setError(true);
         };

    if (!videoId) 
        return <p>No video available</p>;

     const opts = 
     {
        height: height_param,
        width:  width_param,
        playerVars: 
        {
            autoplay: autoPlay_param,
        },
    } ;

  
    return <>
               { error && <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" >Watch on YouTube </a>}
               { !error &&  <YouTube videoId={videoId} opts={opts} onError={handleError} />}
    </>
    //return <YouTube videoId={videoId} opts={opts} />;
    
}

export default YouTubePlayer


/*
import YouTube from "react-youtube";

function YouTubePlayer({ videoId }) {
  if (!videoId) return <p>No video available</p>;

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
}

export default YouTubePlayer;

*/