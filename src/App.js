import React, {useState, useEffect} from 'react';
import './App.css';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() =>{
    getLocalTodos();
  }, []);

  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status){
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
          break;
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("localStorage"+localStorage.getItem("todos"))
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
      console.log("gettodos"+localStorage.getItem("todos"))
    } 
    else{
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      console.log("localTOdos" +localTodos);
      setTodos(localTodos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to ToDo App</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos ={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
