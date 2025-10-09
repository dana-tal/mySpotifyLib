import "../List.css";
import Paper from '@mui/material/Paper';


function ListItemContainer({image_obj,title,children}) {

    const SHADOW_INTENSITY = import.meta.env.VITE_PAPER_SHADOW_INTENSITY;
  
    return (     
        <Paper elevation={SHADOW_INTENSITY} className="list-item-container">
                <div style={{ paddingTop:"5px", paddingBottom:"3px" }}> <img src={image_obj?.url} style={{height:"150px" ,width:"`150px"}} alt={title} /></div>  
                <div className="list-item-content">
                <div style={{marginBottom:"3px" }}>{ title}</div>
                    <div>
                        {children}
                    </div>
                </div> 
        </Paper> 
  )
  
}

export default ListItemContainer