import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import AddTodo from "./Components/AddTodo/AddTodo";
import SortTodo from "./Components/SortTodo/SortTodo";
import Todos from "./Components/Todos/Todos";
import EditTodoForm from "./Components/EditTodoForm/EditTodoForm";
import Modal from "./Components/UI/Modal/Modal";
import Aux from "./hoc/Aux";

import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todos.todoapp";

function App() {
  const [todos, setTodos] = useState([]);
  const [toggleShowIncomplete, setToggleShowIncomplete] = useState(false);
  const [selectEditTodo, setSelectEditTodo] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  const todoNameRef = useRef();

  // filter to display complete & incomplete todos
  const incompleteFilter = [...todos];
  const sort = incompleteFilter.filter((todo) =>
    todo.completed === false ? todo.id : null
  );

  //retrieves the todos if present in the local storage( // * runs only ones)
  useEffect(() => {
    const storeTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storeTodo) setTodos(storeTodo);
  }, []);

  //stores the todos on to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  //function to add todo
  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: name,
        completed: false,
      },
    ]);
    todoNameRef.current.value = null;
  };

  //function to toggle todo item
  const handleTodoCompleteToggle = (id) => {
    const newTodo = [...todos];
    const todo = newTodo.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodo);
  };

  //function to delete todo item
  const handleClickTodoDelete = (id) => {
    const newTodo = [...todos];
    const todo = newTodo.filter((todo) => todo.id !== id);
    setTodos(todo);
  };

  // Function to edit todo item
  const handleClickEditTodo = (id) => {
    const newTodo = [...todos];
    const todo = newTodo.filter((todo) => todo.id === id);
    setSelectEditTodo(todo);
    setToggleModal(true);
  };

  // Function to edit selected todo item
  const handleEditTodo = (e) => {
    const name = e.target.value;
    setEditedName(name);
  };

  // Function to confirm todo edit
  const handleEditConfirm = () => {
    const newTodo = [...todos];
    const editTodo = selectEditTodo.reduce((el) => el);
    const todo = newTodo.filter((todo) => todo === editTodo).reduce((el) => el);
    if (editedName === "") return todo.title;
    todo.title = editedName;
    setTodos(newTodo);
    setToggleModal(false);
  };

  // Function to cancel todo edit
  const handleCancelEdit = () => {
    setToggleModal(false);
  };
  //function to show incomplete todos
  const handleShowNotCompleted = () => {
    setToggleShowIncomplete(true);
  };

  //function to show all todos
  const handleShowAll = () => {
    setToggleShowIncomplete(false);
  };

  return (
    <Aux>
      <Modal show={toggleModal}>
        <EditTodoForm
          todo={selectEditTodo}
          editTodoChange={handleEditTodo}
          editConfirm={handleEditConfirm}
          cancelEdit={handleCancelEdit}
        />
      </Modal>
      <nav className='header'>
        <h1>Todo App</h1>
      </nav>
      <div className='component'>
        <AddTodo todoRef={todoNameRef} addTodo={handleAddTodo} />
      </div>
      <div className='component'>
        <SortTodo
          todos={todos}
          showCompleted={handleShowNotCompleted}
          showAll={handleShowAll}
        />
      </div>
      <div className='component'>
        {toggleShowIncomplete === true ? (
          <Todos
            todos={sort}
            toggleTodo={handleTodoCompleteToggle}
            deleteTodo={handleClickTodoDelete}
            editTodo={handleClickEditTodo}
          />
        ) : (
          <Todos
            todos={todos}
            toggleTodo={handleTodoCompleteToggle}
            deleteTodo={handleClickTodoDelete}
            editTodo={handleClickEditTodo}
          />
        )}
      </div>
    </Aux>
  );
}
export default App;
