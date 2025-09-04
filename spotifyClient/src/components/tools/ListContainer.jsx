import "../List.css";
import PaginationControlled from './PaginationControlled';
import { useEffect,useState} from 'react';

function ListContainer({title,fetchFunc,perPage,children}) {

   const [pageNum, setPageNum] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   
  const handlePageChange = (pageNumber)=>
  {  
       setPageNum(pageNumber-1); // spotify offset starts from 0
  }

  useEffect(() => {
  console.log("inside useEffect");
  
  const loadData = async () => {
    const result = await fetchFunc(pageNum);
    if (result?.total != null) {
      setTotalPages(Math.ceil(result.total / perPage));
    }
  };

  loadData();
}, [pageNum, fetchFunc, perPage]);


  return (
            <div style={{textAlign:"center"}}>
                <h1 style={{ color:"#654321"}} >{title}</h1>
                <div className="list-container">
                    {children}
                </div>
                <PaginationControlled pageChangedHandler={handlePageChange} totalPages={totalPages}/>
            </div>

  )
}

export default ListContainer