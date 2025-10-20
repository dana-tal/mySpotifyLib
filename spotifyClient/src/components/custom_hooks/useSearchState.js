import { useState, useEffect } from "react";

export default function useSearchState(storageKey) {
  const [mode, setMode] = useState(() => sessionStorage.getItem(`${storageKey}_mode`) || "normal");
  const [searchType, setSearchType] = useState(() =>
    mode === "normal" ? "library" : (sessionStorage.getItem(`${storageKey}_searchType`) || "")
  );
  const [searchTerm, setSearchTerm] = useState(() =>
    mode === "normal" ? "" : (sessionStorage.getItem(`${storageKey}_searchTerm`) || "")
  );

  // Persist in sessionStorage whenever state changes
  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_mode`, mode);
    sessionStorage.setItem(`${storageKey}_searchType`, searchType);
    sessionStorage.setItem(`${storageKey}_searchTerm`, searchTerm);
  }, [mode, searchType, searchTerm, storageKey]);

  // Handlers to pass directly to SearchContainer
  const onModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "normal") {  // so that next time we search , we will start with these defaults
      setSearchType("library");
      setSearchTerm("");
    }
  };

  const onSearchChange = (newSearchType, newSearchTerm) => {
     
    setSearchType(newSearchType);
    setSearchTerm(newSearchTerm);
  };

  return { mode, searchType, searchTerm, onModeChange, onSearchChange };
}
