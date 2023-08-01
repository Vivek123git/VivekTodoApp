import React, { useState } from "react";

const TodoApp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const [arr, setArr] = useState([]);

  const handleClick = () => {
    if (state.id !== undefined) {
      setArr((prevTodos) =>
        prevTodos.map((todo) => (todo.id === state.id ? state : todo))
      );
      setState({
        name: "",
        email: "",
        age: ""
      });
    } else {
      setArr([...arr, { ...state, id: Date.now() }]);
      setState({
        name: "",
        email: "",
        age: ""
      });
    }
  };

  const handleDelete = (id) => {
    const fil = arr.filter((ele, ind) => {
      return ind !== id;
    });
    setArr(fil);
  };

  const handleEdit = (id) => {
    const edit = arr.find((ele, ind) => {
      return ind === id;
    });
    setState(edit);
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
      <button onClick={handleClick}>Submit</button>
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
                  <button onClick={() => handleEdit(id)}>Edit</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
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
