import { Link,Outlet } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';



function Library(props) {
  return (  
    <div style={{ backgroundColor:"#C8AD7F", display:"flex",  flexDirection:"column", justifyContent: "center",   minHeight: "100dvh", overflow: "auto"}}>  
     <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="row"  gap={2}   flexWrap="wrap" sx={{ mt: 1}}  justifyContent="center"  >
              <Button variant="contained" sx={{ backgroundColor: '#438D80' }} ><Link to="/">Home</Link></Button>
              <Button variant="contained" sx={{ backgroundColor: '#438D80' }}><Link to="songs">Songs</Link></Button>
              <Button variant="contained" sx={{ backgroundColor: '#438D80'  }} > <Link to="artists">Artists</Link></Button>
              <Button variant="contained" sx={{ backgroundColor: '#438D80' }} ><Link to="albums">Albums</Link></Button>
          </Stack> 
      </Box>         
      <Outlet style={{   minHeight: "90dvh", overflow: "auto"}} />      
    </div>
  )
}

export default Library