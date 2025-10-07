// SearchContainer.jsx
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchBox from "./SearchBox";

function SearchContainer({ mode, searchType, searchTerm, onModeChange, onSearchChange }) {
  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-labelledby="mode-select-label"
          name="mode-buttons-group"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <FormLabel
            id="mode-select-label"
            style={{ alignSelf: "center", marginRight: "1rem", color: "black" }}
          >
            Mode:
          </FormLabel>
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="search" control={<Radio />} label="Search" />
        </RadioGroup>
      </FormControl>

      {mode === 'search' && (
        <SearchBox
          searchType={searchType}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange} // pass handler directly
        />
      )}
    </>
  );
}

export default SearchContainer;
