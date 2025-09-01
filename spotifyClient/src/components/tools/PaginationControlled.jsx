import { useState } from "react";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({totalPages=20,pageChangedHandler}) {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    pageChangedHandler(value);
  };

  return (
    <Stack direction="column"  gap={2}   flexWrap="wrap" sx={{ mt: 1}}  justifyContent="center" >
        <Typography>Page: {page}</Typography>
        <Stack direction="row"  gap={2}   flexWrap="wrap" sx={{ mt: 1}}  justifyContent="center" >
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
        </Stack>
    </Stack>
  );
}
