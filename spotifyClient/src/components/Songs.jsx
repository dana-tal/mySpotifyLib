import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ListContainer from "./tools/ListContainer";
import SearchContainer from "./tools/SearchContainer";
import Loader from "./tools/Loader";
import SongListItem from "./SongListItem";
import { getSongsGroup, getSongsSearchResult } from "../utils/requests";
import useSearchState from "./custom_hooks/useSearchState";

const SONGS_PER_PAGE = import.meta.env.VITE_SONGS_PER_PAGE;

function Songs() {
  const storageKey = "songs";

  // useSearchState hook
  const { mode, searchType, searchTerm, onModeChange, onSearchChange } = useSearchState(storageKey);

  const [tracks, setTracks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errMsg, setErrMsg] = useState(null);


  const handleSearchSubmit = (newSearchType, newSearchTerm) =>{
           setStatus("loading");
           onSearchChange(newSearchType,newSearchTerm);
  }

  // Fetch function passed to ListContainer
  const fetchSongs = useCallback(async (pageNum, mode, searchType, searchTerm) => {
    try {
      const result =
        mode === "normal"
          ? await getSongsGroup(SONGS_PER_PAGE, pageNum)
          : await getSongsSearchResult(SONGS_PER_PAGE, pageNum, searchType, searchTerm);

      setTracks(result.items);
      setStatus("success");
      return { total: result.total };
    } catch (err) {
      console.error("Error fetching songs:", err);
      setStatus("error");
      setErrMsg(err);
      return { total: 0 };
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
         <h1 style={{ color: "#654321" }}>My Songs</h1>
      <SearchContainer
        mode={mode}
        searchType={searchType}
        searchTerm={searchTerm}
        onModeChange={onModeChange}
        onSearchChange={handleSearchSubmit}
      />

      <ListContainer
        
        fetchFunc={fetchSongs}
        perPage={SONGS_PER_PAGE}
        storageKey={storageKey}
        mode={mode}
        searchType={searchType}
        searchTerm={searchTerm}
      >
        {status === "loading" && <Loader />}
        {status === "success" && tracks.length > 0 &&
          tracks.map(item => {
            const my_obj = item.track ? item.track : item;
            return (
              <Link key={my_obj.id} to={`${my_obj.id}`} className="list-item-link">
                <SongListItem item={item} />
              </Link>
            );
          })
        }
        {status === "success" && tracks.length === 0 && <span>No songs found</span>}
        {status === "error" && <p>Error fetching data: {errMsg?.message || String(errMsg)}</p>}
      </ListContainer>
    </div>
  );
}

export default Songs;
