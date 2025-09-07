import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";


function NavBar() {

    return (
    <Box className="navbar-container">
      <Stack className="navbar-stack" direction="row" flexWrap="wrap" gap={2}>
        <Button variant="contained" className="navbar-button" component={NavLink} to="/" end >Home</Button>
        <Button variant="contained" className="navbar-button" component={NavLink} to="songs">Songs</Button>
        <Button variant="contained" className="navbar-button" component={NavLink} to="artists">Artists</Button>
        <Button variant="contained" className="navbar-button" component={NavLink} to="albums">Albums</Button>
      </Stack>
    </Box>
  );

}

export default NavBar