/*import Songs from './Songs';
import Albums from './Albums';
import Artists from './Artists';

*/
import { Link,Outlet } from "react-router-dom";



function Library(props) {
  return (
    <div>
      <h1 style={{color:"aquamarin"}}>Welcom To my Library</h1>
      <nav>
        <Link to="/">Welcome Page</Link>&nbsp;
        <Link to="songs">Songs</Link>&nbsp;
        <Link to="artists">Artists</Link>&nbsp;
        <Link to="albums">Albums</Link>&nbsp;
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Library