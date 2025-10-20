import { useState } from "react";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from "react";

export default function PaginationControlled({totalPages=20,pageChangedHandler,page_key}) {

  
  const [page, setPage] = useState( ()=>{ return +sessionStorage.getItem(page_key) || 1 } );

  const handleChange = (event, value) => {
    setPage(value);
    pageChangedHandler(value);
  };

  
  useEffect(() => {
         sessionStorage.setItem(page_key,page);

  },[page]);

  return (
    <Stack direction="column"  gap={2}   flexWrap="wrap" sx={{ mt: 1}}  justifyContent="center" >
        <Typography>Page: {page}</Typography>
        <Stack direction="row"  gap={2}   flexWrap="wrap" sx={{ mt: 1}}  justifyContent="center" >
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
        </Stack>
    </Stack>
  );
}
