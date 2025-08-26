
function Albums(props) {
  return (
    <div>
        <h1>Albums</h1>
        <ul>
            { props.albums.map ( item => {
                
                return <li key={item.album.id}> { item.album.name } - {item.album.artists[0].name}</li>
                } ) } 
        </ul>
    </div>
  )
}



export default Albums