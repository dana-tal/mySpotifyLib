import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./Library.css";

function Library() {
  return (  
    <div className="library-container">  
       <NavBar />     
      <Outlet className="outlet-style"/>      
    </div>
  )
}

export default Library