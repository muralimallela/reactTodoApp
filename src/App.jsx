import React, { useState } from "react";
const App = () => {

  const [message, setMessage] = useState({
    id: "",
    text: ""
  });
  const [list, setList] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    isEditing: false
  });
  const messageChange = (e) => {
    setMessage({
      ...message,
      text: e.target.value
    })
  }
  const addMessage = (e) => {
    e.preventDefault();
    let todo = {
      id: new Date().getTime().toString(),
      text: message.text
    }
    setList([...list, todo]);
    setMessage({
      id: "",
      text: ""
    })
  }
  const deleteMessege = (id) => {
    let todo = list.filter((eachObj) => {
      return eachObj.id !== id
    })
    setList(todo)
  }
  const changeEditState = (id) => {
    setEditState({
      ...editState,
      id: id,
      isEditing: true
    })
    let editableitem = list.find((eachitem) => eachitem.id === id);
    setMessage({
      ...message,
      id: editableitem.id,
      text: editableitem.text
    })
  }
  const editMessage = (e) => {
    e.preventDefault();
    let todo = list.map((eachObj) => {
      if (eachObj.id === editState.id)
        return ({
          text: message.text,
          id: eachObj.id
        })
      else
        return eachObj
    })
    setList(todo);
    setMessage({
      id: "",
      text: ""
    });
    setEditState({
      id: "",
      isEditing: false
    })
  }
  return (
    <div className="container">
      <div className="container">
        <form action="">
          <div className="input-group mb-4">
            <input type="text"
              className="form-control"
              placeholder="Enter any text"
              value={message.text}
              onChange={messageChange} />
            <div className="input-group-append">
              {editState.isEditing ?
                <button className="btn btn-success" type="submit" onClick={editMessage} >Edit</button> :
                <button className="btn btn-success" type="submit" onClick={addMessage} >Add</button>
              }
            </div>
          </div>
        </form>
      </div>
      <hr />
      <center>{list.length === 0 && <h4>No data!</h4>}</center>
      <center>
        <table className="table-bordered" style={{ textAlign: 'center' }}>
          <tbody>
            {list.map(({ id, text }) => {
              return (
                <tr key={id}>
                  <td> <span>{text}</span></td>
                  <td><button className="btn btn-primary btn-sm" onClick={() => changeEditState(id)}>Edit</button></td>
                  <td><button className="btn btn-danger btn-sm" type="submit" onClick={() => deleteMessege(id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
    </div>
  );
}
export default App;