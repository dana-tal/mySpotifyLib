import { getSongsGroup} from '../utils/requests';
import { useEffect, useState ,useRef} from 'react';
import SongListItem from './SongListItem';
import "./Songs.css";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import PaginationControlled from './tools/PaginationControlled';


const SONGS_PER_PAGE = import.meta.env.VITE_SONGS_PER_PAGE;

function Songs(props) {

  const [tracks, setTracks] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const totalPagesRef = useRef(0);

  const handlePageChange = (pageNumber)=>
  {  
       setPageNum(pageNumber-1); // spotify offset starts from 0
  }

 useEffect(() => {
    const fetchSongs = async () => {
      try {
           
          const mySongs = await getSongsGroup(SONGS_PER_PAGE,pageNum);
          totalPagesRef.current = Math.ceil(mySongs.total / SONGS_PER_PAGE);
         //  console.log( mySongs);
         // console.log(mySongs.items);
          setTracks(mySongs.items);

      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchSongs();
  }, [pageNum]);


  return (
    <div style={{textAlign:"center"}}>
      <h1 style={{ color:"#654321"}} >Liked Songs</h1>
      <div className="songs-container">

         { tracks.length >0 && tracks.map( item => <SongListItem item={item}/>)}
         { tracks.length ===0 && 
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
              <CircularProgress    sx={{ color: '#ff99c8' }} />
              <CircularProgress sx={{ color: '#fcf6bd' }}  />
              <CircularProgress sx={{ color: '#d0f4de' }}  />
               <CircularProgress sx={{ color: '#a9def9' }}  />
              <CircularProgress sx={{ color: '#e4c1f9' }}  />
          </Stack>
         }
      </div>
      <PaginationControlled pageChangedHandler={handlePageChange} totalPages={totalPagesRef.current}/>
    </div>
    
  )
}

export default Songs