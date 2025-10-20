import "../List.css";
import CursorPagination from "./CursorPagination";
import { useEffect, useState } from "react";

// in spotify get followed artists api,  after means The cursor to use as key to find the next page of items.

function CursorListContainer({  fetchFunc, children, storageKey }) {

   const key = (name) => `${storageKey}_${name}`; 

    // cursor used to fetch the current page
  const [currentPage, setCurrentPage] = useState( ()=>{  
  
    const currentPageVal = sessionStorage.getItem(key("currentPage"));
      return currentPageVal === "" ? null : currentPageVal;
   });
   
    // cursor for the NEXT page (from API)
  const [nextPage, setNextPage] = useState(()=>{  
    const nextPageVal = sessionStorage.getItem(key("nextPage"));  
    return nextPageVal ==="" ? null : nextPageVal;
  });

  // stack of cursors we used
  const [cursorHistory, setCursorHistory] = useState(()=>{
           const savedCursorHistory = sessionStorage.getItem(key("cursorHistory")) ;
           return savedCursorHistory ? JSON.parse(savedCursorHistory) : [];         
    }); 


  const [hasNext, setHasNext] = useState(()=>{ 
      const savedHasNext = sessionStorage.getItem(key("hasNext"));
      return savedHasNext ? JSON.parse(savedHasNext): false; 
  
  });

  
  const loadPage = async (pageCursor) => {
    const result = await fetchFunc(pageCursor, null);

    if (result.cursors) {
      const nextCursor = result.cursors.after ?? null;
      setNextPage(nextCursor);
      sessionStorage.setItem(key("nextPage"),nextCursor ?? "") ;
      setHasNext(nextCursor !== null);
      sessionStorage.setItem(key("hasNext"),JSON.stringify(nextCursor !== null));
    }

    // keep track of which cursor fetched THIS page
    setCurrentPage(pageCursor);
    sessionStorage.setItem(key("currentPage"),pageCursor ?? ""); // pageCursor may be null, so in case pageCursor is null i store "" 
  };

  const nextHandler = async () => {
    // save the current cursor into history before moving forward
    setCursorHistory((prev) =>{ 
       sessionStorage.setItem(key("cursorHistory"),JSON.stringify([...prev, currentPage]));
      return [...prev, currentPage];
     }); // notice that the last cursor is actually the previous page we visited
   
    await loadPage(nextPage);
  };

  const prevHandler = async () => {
    if (cursorHistory.length === 0) return;

    // pop the last cursor we used
    const history = [...cursorHistory];
    const prevPage = history.pop(); // remove the last cusror from history and return it

    setCursorHistory(history);
    sessionStorage.setItem(key("cursorHistory"),JSON.stringify(history));
    await loadPage(prevPage);
  };

  useEffect(() => {
    loadPage(currentPage);
  }, [fetchFunc]);

  return (
    <div style={{ textAlign: "center" }}>
     
      <div className="list-container">{children}</div>
      <CursorPagination
        onPrev={prevHandler}
        onNext={nextHandler}
        hasPrev={cursorHistory.length > 0}
        hasNext={hasNext}
      />
    </div>
  );
}

export default CursorListContainer;
