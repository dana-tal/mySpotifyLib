import "../List.css";
import PaginationControlled from './PaginationControlled';
import { useEffect, useState, useRef } from 'react';

function ListContainer({ 
  fetchFunc, 
  perPage, 
  children, 
  storageKey, 
  mode, 
  searchType, 
  searchTerm
}) {

  // Compute storage keys based on current mode/searchType
  const keyPrefix = mode === 'normal' 
    ? `${storageKey}_normal` 
    : `${storageKey}_${searchType}_search`;
  const pageNumKey = `${keyPrefix}_pageNum`;
  const totalPagesKey = `${keyPrefix}_totalPages`;

  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const afterSearch = mode === 'search' && searchTerm && searchTerm.trim() !== "";

  const prevDeps = useRef({ mode, searchType, searchTerm });
  const skipImmediateFetchRef = useRef(false); // NEW — prevents double-fetch

  // Effect A: handle pagination state reset or restore
  useEffect(() => {
    // Detect real parameter change
    if (
      prevDeps.current.mode !== mode ||
      prevDeps.current.searchType !== searchType ||
      prevDeps.current.searchTerm !== searchTerm
    ) {
     
          if (pageNum !== 1)
          {
              skipImmediateFetchRef.current = true; // only skip if pageNum is actually changing
              setPageNum(1);
          }
      // console.log("Reset pageNum due to search change");
    } else {
      // Restore page number from sessionStorage
      const savedPage = sessionStorage.getItem(pageNumKey);
      if (savedPage) {
        setPageNum(+savedPage);
        // console.log("Restored pageNum from sessionStorage");
      }
    }

    // Restore total pages
    const savedTotal = sessionStorage.getItem(totalPagesKey);
    if (savedTotal) setTotalPages(+savedTotal);

    // Update refs
    prevDeps.current = { mode, searchType, searchTerm };
  }, [mode, searchType, searchTerm, pageNumKey, totalPagesKey]);

  // Effect B: handle actual data fetching
  useEffect(() => {
    sessionStorage.setItem(pageNumKey, pageNum);
    sessionStorage.setItem(totalPagesKey, totalPages);

    // If a reset just happened, skip this run
    if (skipImmediateFetchRef.current) {
      skipImmediateFetchRef.current = false;
      return;
    }

    const loadData = async () => {
      if (mode === 'normal' || afterSearch) {
        // console.log("Fetching data:", { mode, searchType, searchTerm, pageNum });

        const result = await fetchFunc(pageNum - 1, mode, searchType, searchTerm);
        if (result?.total != null) {
          setTotalPages(Math.ceil(result.total / perPage));
        }
      }
    };

    loadData();
  }, [pageNum, fetchFunc, perPage, mode, searchType, searchTerm, pageNumKey, totalPagesKey, afterSearch]);

  const handlePageChange = (pageNumber) => {
    setPageNum(pageNumber);
  };

  return (
    <div style={{ textAlign: "center" }}>   
      {(afterSearch || mode === 'normal') && (
        <>
          <div className="list-container">
            {children}
          </div>
          <PaginationControlled
            pageChangedHandler={handlePageChange}
            totalPages={totalPages}
            page={pageNum}
          />
        </>
      )}
    </div>
  );
}

export default ListContainer;
