
function Songs(props) {
  return (
    <div>
      <h1>Liked Songs</h1>
      <table>
        <thead>
             <th>Title</th>
             <th>Artist</th>
             <th>Album</th>
             <th>Date Added</th>
             <th>Duration</th>
        </thead>
         <tbody>

         
    
        {props.tracks.map(item => (
          <tr key={item.track.id}>
             <td>{item.track.name}</td>
             <td>{item.track.artists[0].name}</td>
             <td>{item.track.album.name }</td>
             <td>{item.added_at}</td>
             <td>{item.track.duration_ms}</td>
          </tr>
        ))}
        
        </tbody>
      </table>
    </div>
  )
}

export default Songs