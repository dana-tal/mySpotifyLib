import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./Library.css";

function Library() {
  return (  
    <div className="library-container">  
       <NavBar />     
       <div className="outlet-style">
          <Outlet />      
        </div>
    </div>
  )
}

export default Library