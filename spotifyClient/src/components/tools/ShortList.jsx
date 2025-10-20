
import './ShortList.css';

function ShortList({title,listItems}) {

  return (
    <div className="short-list" >
    <h3>{title}</h3>
    <ul>
        { listItems.map((item)=>{ return <li key={item}>{item}</li>} )  }
    </ul>
    </div>
  )
}

export default ShortList