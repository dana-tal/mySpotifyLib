import Songs from './Songs';
import Albums from './Albums';
import Artists from './Artists';


function Library(props) {
  return (
    <div>
      <h1 style={{color:"yellow"}}>Welcom To my Library</h1>
        <Songs isLogged={true} />
         <Albums albums={true} />
        <Artists artists={true} />
    </div>
  )
}

export default Library