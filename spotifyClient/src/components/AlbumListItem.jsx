import { shortenString } from "../utils/genFuncs";
import ListItemContainer from "./tools/ListItemContainer";

function AlbumListItem(props) {
  
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;
  const image_obj = props.item.album.images[1];

  return (
            <ListItemContainer image_obj={image_obj}  title={ shortenString(props.item.album.name,MAX_TITLE_LENGTH)}>
            {
                  shortenString(props.item.album.artists[0].name,MAX_TITLE_LENGTH) 
            }                            
            </ListItemContainer>
        )      
}

export default AlbumListItem