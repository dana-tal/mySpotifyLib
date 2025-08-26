
function Artists(props) {
  return (
    <div>
       <h1> Artists</h1>
       <ul>
          { props.artists.map (  artist => <li key={ artist.id}>{artist.name}</li>)}
       </ul>
    </div>
  )
}

export default Artists