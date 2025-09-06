import { Button, ButtonGroup } from "@mui/material";

function CursorPagination({ onPrev, onNext, hasPrev, hasNext }) {
  return (
    <ButtonGroup sx={{ marginTop:"10px",  boxShadow: "none", "& .MuiButton-root": { boxShadow: "none" }}} variant="contained" >
      <Button onClick={onPrev} disabled={!hasPrev} sx={{ marginRight:"10px"}}>
        Prev
      </Button>
      
      <Button onClick={onNext} disabled={!hasNext}>
        Next
      </Button>
    </ButtonGroup>
  );
}

export default CursorPagination;
