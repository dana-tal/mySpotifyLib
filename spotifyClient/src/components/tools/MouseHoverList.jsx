import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {useState,useEffect} from "react";

export default function MouseHoverList({list,title="",children}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
       {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
            { title && <h4>{title}</h4>}
            <ul style={{ paddingRight:'10px'}}>                        
                         {
                            Array.isArray(list) ? list.map((item) =>{ return <li key={item}>{item}</li>}): <li>(no items)</li>
                         }
            </ul>
        </Typography>
      </Popover>
    </div>
  );
}
