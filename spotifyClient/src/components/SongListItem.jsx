import "./Songs.css";
import { shortenString } from "../utils/genFuncs";
import Paper from '@mui/material/Paper';

function SongListItem(props) {
  
  const SHADOW_INTENSITY = import.meta.env.VITE_PAPER_SHADOW_INTENSITY;
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;

  const image_obj = props.item.track.album.images[1];

  return (
    
  
   
   <Paper elevation={SHADOW_INTENSITY} className="song-list-item-container">
        <div style={{ paddingTop:"5px", paddingBottom:"3px" }}> <img src={image_obj.url} style={{height:"150px" ,width:"`150px"}}  /></div>  
         <div className="song-list-item-content">
              <div style={{marginBottom:"3px" }}>{ shortenString(props.item.track.name,MAX_TITLE_LENGTH) }</div>
              <div>                
                {
                  shortenString(props.item.track.artists[0].name,MAX_TITLE_LENGTH) 
                }                
            </div>
        </div> 
    </Paper> 
    
  )
}

export default SongListItem