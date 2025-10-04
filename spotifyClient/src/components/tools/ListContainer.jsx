import "../List.css";
import PaginationControlled from './PaginationControlled';
import { useEffect,useState} from 'react';
import SearchBox from "./SearchBox";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ListContainer({title,fetchFunc,perPage,children,storageKey}) {

    const key = (name) => `${storageKey}_${name}`;  // this function will be used to prefix session storage keys, so that each list will have its own set of fields 


   const [mode, setMode] = useState( ()=>{ return sessionStorage.getItem(key("mode")) || 'normal' });        /* determines weather we display search results or normal library content songs, albums etc */
   const [searchType, setSearchType] = useState( ()=>{ return  mode==='normal'?'library':(sessionStorage.getItem(key("searchType")) || '') });
   const [searchTerm, setSearchTerm] = useState( ()=>{ return  mode==='normal'?'':(sessionStorage.getItem(key("searchTerm")) || '') });

   console.log("searchType from sessionStorage is: "+sessionStorage.getItem(key("searchType")));
   console.log("line 20, searchType is:"+searchType);

   //  const [afterSearch, setAfterSearch] = useState( false);

   // within a category like songs , we have 3 types of lists : 1.normal (the regular library content), 2. library search results , 3. global spotify search results
   // so we need 3 fields in sessionStorage to preserver pageNum and totalPages, each per list type 
   const pagination_key = (name) =>{  
         let prefix = storageKey;

         if (mode==='normal')
          {
             prefix += '_normal';   // songs_normal_page or songs_normal_totalPages ....      
          }
          else 
          {
             prefix += '_'+searchType+'_search';  // songs_library_search or songs_spotify_search 
          }      
          return (prefix+'_'+name);
     };

  const [pageNum, setPageNum] = useState( ()=>{  return +sessionStorage.getItem(pagination_key("pageNum")) || 1 });
  const [totalPages, setTotalPages] = useState( ()=>{ return +sessionStorage.getItem(pagination_key("totalPages")) || 0 });
      
  const afterSearch = mode === 'search' && searchTerm && searchTerm.trim() !== ""; 

//  console.log("Listcontainer:");
//  console.log( key("mode")+": ");
//  console.log( mode);
//  console.log(key("searchType"));
//  console.log(searchType);
//  console.log(key("searchTerm"));
//  console.log(searchTerm);
//  console.log(pagination_key("pageNum"));
//  console.log(pageNum);

  const handleModeChange =(event)=>{
    organizeParams(event.target.value,searchType,searchTerm);  
  }

  const handlePageChange = (pageNumber)=>
  {  
      setPageNum(pageNumber); 
  }

  const handleParamsChange = (mode_param,search_type_param='',search_term_param='' ) =>
  {
    organizeParams(mode_param,search_type_param,search_term_param);

  }


  const organizeParams = (mode_param,search_type_param='',search_term_param='') =>{

    console.log("mode_param:"+mode_param);
    setMode(mode_param);
    if (mode_param==='normal')
    {
       setSearchType('library');
       setSearchTerm('');
    }
    else 
    {
      setSearchType(search_type_param);
      setSearchTerm(search_term_param);
    }
    setPageNum(1); // in any kind of change (mdoe_param, search_type, search_term) we need to reset the page to the initial value of 1
    sessionStorage.setItem(pagination_key("pageNum"),1);

  }


  useEffect(() => {
  
    sessionStorage.setItem(key("mode"), mode);
    sessionStorage.setItem(key("searchType"), searchType);
    sessionStorage.setItem(key("searchTerm"),searchTerm);
    sessionStorage.setItem(pagination_key("pageNum"),pageNum);
    sessionStorage.setItem(pagination_key("totalPages"),totalPages);

   

  const loadData = async () => {

    console.log("current mode is:"+mode);
    console.log("current search type is:"+ searchType);
    console.log("current search term is: "+searchTerm);

    if (mode==='normal' || (searchTerm && searchTerm.trim() !=="") )
    {
      const result = await fetchFunc(pageNum-1,mode,searchType,searchTerm);   //mode,searchType,searchTerm
      if (result?.total != null) {
        setTotalPages(Math.ceil(result.total / perPage));
      }
    }
  };

  loadData();
}, [pageNum, fetchFunc, perPage,mode,searchType,searchTerm]);


  return (
            <div style={{textAlign:"center"}}>
                <h1 style={{ color:"#654321"}} >{title}</h1>

                 <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-labelledby="mode-select-label"
                    name="mode-buttons-group"
                    value={mode}
                    onChange={handleModeChange}
                    defaultValue='normal'
                  >
                    <FormLabel id="mode-select-label" style={{ alignSelf: "center", marginRight: "1rem", color:"black" }}>
                      Mode:
                    </FormLabel>
                    <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                    <FormControlLabel value="search" control={<Radio />} label="Search" />
                  </RadioGroup>
                </FormControl>

                {mode === 'search' && <SearchBox  onSearchChange={handleParamsChange} searchType={searchType} searchTerm={searchTerm} />}
                { console.log("mode="+mode) }
                { console.log("afterSearch is: ",afterSearch)}
                { (afterSearch || mode==='normal')  &&  
                 <>
                    <div className="list-container">
                        {children}
                    </div>
                    <PaginationControlled pageChangedHandler={handlePageChange} totalPages={totalPages} page={pageNum} />
                 </>
                }
            </div>

  )
}

export default ListContainer