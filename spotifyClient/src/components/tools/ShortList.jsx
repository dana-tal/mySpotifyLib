
import './ShortList.css';

function ShortList({title,listItems,width,height}) {

    const list_width = width+'px';
    const list_height = height+'px';
  return (
    <div className="short-list" style={{ width:list_width, height:list_height }}>
    <h3>{title}</h3>
    <ul>
        { listItems.map((item)=>{ return <li key={item}>{item}</li>} )  }
    </ul>
    </div>
  )
}

export default ShortList