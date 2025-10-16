
import './ImagesGroup.css';
import { isMobile } from '../../utils/genFuncs';
import {Link} from 'react-router-dom';

const is_mobile = isMobile();

function ImagesGroup({list,itemType}) {
  return (
            <div className="imagesContainer"> 
                       { list.length > 0 &&
                             list.map(item => {

                                   let my_obj, segment,image_obj, image_width, image_height; 
                                   switch(itemType)
                                   {
                                       case 'song':
                                                   my_obj = item.track ? item.track : item;
                                                   image_obj = my_obj.album.images[1]; 
                                                   segment = 'songs';    
                                                   image_width =  is_mobile ? '130px':'150px';
                                                   image_height = is_mobile ? '130px': '150px';
                                                   break;
                                   }     
                            
                                    return (
                                        <div className="imageItem">
                                            <Link key={my_obj.id} to={`/library/${segment}/${my_obj.id}`} className="list-image-link">
                                                <img src={image_obj.url} alt={my_obj.name} style={{ width:image_width, height:image_height}} />
                                            </Link>
                                        </div>
                                    );
                            })
                          }
            </div>



  )
}

export default ImagesGroup