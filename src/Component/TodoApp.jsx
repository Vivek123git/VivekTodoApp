import React, { useState ,useEffect} from "react";
import axios from 'axios';

const TodoApp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    image:""
  });

console.log(state.image)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      // Update the state with the selected file
      setState({
        ...state,
        [name]: e.target.files[0],
      });
    } else {
      // Update the state for other form fields
      setState({
        ...state,
        [name]: value,
      });
    }
  };



  const [arr, setArr] = useState([]);
  const [submit,setSubmit] = useState(true)
  const [editId,setEditId] = useState('')

  // const handleClick = () => {
  //   if (state.id !== undefined) {
  //     setArr((prevTodos) =>
  //       prevTodos.map((todo) => (todo.id === state.id ? state : todo))
  //     );
  //     setState({
  //       name: "",
  //       email: "",
  //       age: ""
  //     });
  //   } else {
  //     setArr([...arr, { ...state, id: Date.now() }]);
  //     setState({
  //       name: "",
  //       email: "",
  //       age: ""
  //     });
  //   }
  // };

  // const headers = {
  //   "Content-Type":"application/json"
  // }

  const formData = new FormData();
  formData.append('name', state.name);
  formData.append('email', state.email);
  formData.append('age', state.age);
  formData.append('image', state.image);


  const handleClick = () => {
   axios.post("http://localhost:2000/todo/create",formData)
   .then((res)=>{
   console.log(res.message)
   getTable()
 
   })
   .catch((err)=>{
    console.log(err.message)
   })
  };

  const getTable =()=>{
    axios.get("http://localhost:2000/todo/get_table",{}) .then((res)=>{
      setArr(res.data.data)
      })
      .catch((err)=>{
       console.log(err.message)
      })
  }

  useEffect(()=>{
   getTable()
  },[])

  const handleDelete=(id)=>{
    let ind = {id};
    axios.post("http://localhost:2000/todo/delete_table",ind)
    .then((res)=>{
     getTable();
  
    })
    .catch((err)=>{
     console.log(err.message)
    })
  };

  const handleUpdate=()=>{
    const id = {...state}
    axios.post("http://localhost:2000/todo/edit_table",id)
    .then((res)=>{
      console.log(res.data.data)
      getTable();
      setSubmit(true)
    })
    .catch((err)=>{
     console.log(err.message)
    })
  }

  // const handleDelete = (id) => {
  //   const fil = arr.filter((ele, ind) => {
  //     return ind !== id;
  //   });
  //   setArr(fil);
  // };

  const handleEdit = (id,ind) => {
    setEditId(ind)
    const edit = arr.find((ele, ind) => {
      console.log(ind,"ind")
      return ind === id;
    });
    setState(edit);
    setSubmit(false)
  };

  return (
    <>
      <h3>Todo App</h3>
      <input
        type="text"
        value={state.name}
        name="name"
        onChange={handleChange}
        placeholder="name"
      />
      <input
        type="text"
        value={state.email}
        name="email"
        onChange={handleChange}
        placeholder="email"
      />
      <input
        type="text"
        value={state.age}
        name="age"
        onChange={handleChange}
        placeholder="age"
      />
      <input type="file"  name="image" onChange={handleChange}/>
      {submit?<button onClick={handleClick}>Save</button>:   
      <button onClick={handleUpdate}>Edit</button>}


   
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((elem, id) => {
            return (
              <tr key={id}>
                <td>{elem.name}</td>
                <td>{elem.age}</td>
                <td>{elem.email}</td>
                <td>
                  <button onClick={() => handleEdit(id,elem._id)}>Edit</button>
                  <button onClick={() => handleDelete(elem._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TodoApp;
