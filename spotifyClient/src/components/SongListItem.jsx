import { shortenString } from "../utils/genFuncs";
import ListItemContainer from "./tools/ListItemContainer";

function SongListItem(props) {
  
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;

  const image_obj = props.item.track ? props.item.track.album.images[1]: props.item.album.images[1];
  const song_name = props.item.track ? props.item.track.name: props.item.name;
  const artist_name = props.item.track ? props.item.track.artists[0].name: props.item.artists[0].name; 
    return (
            <ListItemContainer image_obj={image_obj}  title={shortenString(song_name,MAX_TITLE_LENGTH)}>
            {
                  shortenString(artist_name,MAX_TITLE_LENGTH)
            }                            
            </ListItemContainer>
        )   

}

export default SongListItem