import React,{ useState,useEffect} from 'react'
import "./style.css"


const getLocalData = () => {
    const list1 = localStorage.getItem('mytodo')

    if (list1){
        return JSON.parse(list1)
    }
    else{
        return []
    }
}
const Todo = () => {

  const [inputdata,setInputData] = useState("")
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleItem, settoggle] = useState(false)

  const addItem = () => {
      if (!inputdata){
          alert("Please Fill the data")
      }else if (inputdata && toggleItem) {
          setItems( 
              items.map((currr)=>{
                  if (currr.id === isEditItem){
                      return {...currr,name: inputdata}
                  }else{
                      return currr 
                  }
              })
          )
          setInputData("")
          setIsEditItem()
          settoggle(false)

      }else{
          const newData = {
              id : new Date().getTime().toLocaleString(),
              name : inputdata
          }
          setItems([...items,newData])
          setInputData("")
      }
  }

  const deleteItem = (index) => {
      const updatedData = items.filter( (currEle) => {
          return currEle.id !== index
      })
     
      setItems(updatedData)
  }

  const removeall = () => {
      setItems([])
  }

  const editItem = (index) => {
      const item_todo_edited = items.find( (currEle) =>{
          return currEle.id === index
      })

      setInputData(item_todo_edited.name)
      setIsEditItem(index)
      settoggle(true)
  }

  useEffect( ()=> {
      localStorage.setItem("mytodo", JSON.stringify(items))
  })

  return (
    <div>
      <div className="main-div">
          <div className="child-div">
              <figure>
                  <img src="../images/todo.jpg" alt="todoLogo" />
                  <figcaption>Add Your List Here ✌</figcaption>
              </figure>
              <div className="addItems">
                  <input type="text" value={inputdata} onChange={(event)=> {setInputData(event.target.value)}} placeholder="✍ Add Item" className="form-control"/>
                  {toggleItem ? (<i onClick={addItem} className="fa fa-edit add-btn"></i>) : (<i onClick={addItem} className="fa fa-plus add-btn"></i>)}
            
              </div>

              <div className="showItems">
                  {items.map( (currEle,index)=> {
                      return (
                      <div className="eachItem" key={currEle.id}>
                      <h3>{currEle.name}</h3>
                      <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItem(currEle.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(currEle.id)}></i>
                      </div>
                  </div>
                      )
                  })}

              </div>

              <div className="showItems">
                  <button onClick={removeall} className="btn effect04" data-sm-link-text="Remove All"><span>CHECK LIST</span></button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Todo
