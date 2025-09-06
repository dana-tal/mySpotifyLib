import "../List.css";
import CursorPagination from "./CursorPagination";
import { useEffect, useState } from "react";

function CursorListContainer({ title, fetchFunc, children }) {
  const [currentAfter, setCurrentAfter] = useState(null); // cursor used to fetch the current page
  const [nextAfter, setNextAfter] = useState(null); // cursor for the NEXT page (from API)
  const [cursorHistory, setCursorHistory] = useState([]); // stack of cursors we used
  const [hasNext, setHasNext] = useState(false);

  const loadPage = async (pageCursor) => {
    const result = await fetchFunc(pageCursor, null);

    if (result.cursors) {
      const nextCursor = result.cursors.after ?? null;
      setNextAfter(nextCursor);
      setHasNext(nextCursor !== null);
    }

    // keep track of which cursor fetched THIS page
    setCurrentAfter(pageCursor);
  };

  const nextHandler = async () => {
    // save the current cursor into history before moving forward
    setCursorHistory((prev) => [...prev, currentAfter]);
    await loadPage(nextAfter);
  };

  const prevHandler = async () => {
    if (cursorHistory.length === 0) return;

    // pop the last cursor we used
    const prevHistory = [...cursorHistory];
    const prevCursor = prevHistory.pop();

    setCursorHistory(prevHistory);
    await loadPage(prevCursor);
  };

  useEffect(() => {
    loadPage(null); // first page
  }, [fetchFunc]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#654321" }}>{title}</h1>
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
