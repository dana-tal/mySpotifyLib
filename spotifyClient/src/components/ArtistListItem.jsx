import { shortenString } from "../utils/genFuncs";
import ListItemContainer from "./tools/ListItemContainer";

function ArtistListItem(props) {
  
  const MAX_TITLE_LENGTH = import.meta.env.VITE_MAX_TITLE_LENGTH;

  const my_obj = props.item.artist ? props.item.artist : props.item;

  const image_obj = my_obj.images[1];

  console.log("image_obj");
  console.log(image_obj);

    return (
            <ListItemContainer image_obj={image_obj}  title={shortenString(my_obj.name,MAX_TITLE_LENGTH)}>
            {
                  `Followers:${my_obj.followers.total}`
            }                            
            </ListItemContainer>
        )   

}

export default ArtistListItem