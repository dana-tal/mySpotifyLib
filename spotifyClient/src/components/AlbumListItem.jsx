import { shortenString } from "../utils/genFuncs";
import ListItemContainer from "./tools/ListItemContainer";

function AlbumListItem(props) {
  
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;

  const my_obj = props.item.album ? props.item.album: props.item;

  const image_obj = my_obj.images[1];

  return (
            <ListItemContainer image_obj={image_obj}  title={ shortenString(my_obj.name,MAX_TITLE_LENGTH)}>
            {
                  shortenString(my_obj.artists[0].name,MAX_TITLE_LENGTH) 
            }                            
            </ListItemContainer>
        )      
}

export default AlbumListItem