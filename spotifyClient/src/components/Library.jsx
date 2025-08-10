
function Library(props) {
  return (
    <div>
      <h1>Saved Songs</h1>
      <ul>
        {props.tracks.map(item => (
          <li key={item.track.id}>{item.track.name} - {item.track.artists[0].name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Library