import { shortenString } from "../utils/genFuncs";
import ListItemContainer from "./tools/ListItemContainer";

function ArtistListItem(props) {
  
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;

  const image_obj = props.item.images[1];

    return (
            <ListItemContainer image_obj={image_obj}  title={shortenString(props.item.name,MAX_TITLE_LENGTH)}>
            {
                  `Followers:${props.item.followers.total}`
            }                            
            </ListItemContainer>
        )   

}

export default ArtistListItem