import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./SearchBox.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function SearchBox({ onSearchChange ,searchType='library'}) {

console.log("in SearchBox, search_type="+searchType);
 const handleSubmit = (e)=>{
     e.preventDefault();
     const formData = new FormData(e.target);

     const search_type =  formData.get("search_type");
     const search_term = formData.get("search_text");
    
     console.log("search_type: "+search_type);
     console.log("search_text: "+search_term);

     console.log("inside handle submit");
     onSearchChange('search', search_type,search_term);
 }

 

  return (
    <div id="searchbox" style={{  display:"flex", alignItems:"center"}}>
        <form  onSubmit={handleSubmit} style={{ display: "flex", width:"100%" }}>
            <FormControl sx={{ display:"flex", flexDirection:"column", margin:"0px auto"}}>
                    <FormLabel id="search-controlled-radio-buttons-group" sx={{display:"flex", alignItems:"center", color:"black",paddingRight:"15px" }}>Search In:</FormLabel>
                    <RadioGroup
                        aria-labelledby="search-controlled-radio-buttons-group"
                        name="search_type"    
                        id ="search_type"      
                        defaultValue={searchType}                              
                        
                    >
                        <FormControlLabel value="library" sx={{ padding:"1px"}} control={<Radio />} label="This Library" />
                        <FormControlLabel value="spotify" sx={{ padding:"1px"}} control={<Radio />} label="Spotify" />
                    </RadioGroup>
                    <TextField  required id="search_text" name="search_text" label="Enter search words" variant="outlined" />
                    <Button type="submit" variant="contained" size="medium">Submit</Button>
            </FormControl>
        </form>
    </div>
  )
}

export default SearchBox