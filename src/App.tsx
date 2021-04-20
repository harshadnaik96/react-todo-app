import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import AddTodo from "./Components/AddTodo/AddTodo";
import SortTodo from "./Components/SortTodo/SortTodo";
import Todos from "./Components/Todos/Todos";
import EditTodoForm from "./Components/EditTodoForm/EditTodoForm";
import Modal from "./Components/UI/Modal/Modal";
import Snackbar from "./Components/UI/Snackbar/Snackbar";
import Aux from "./hoc/Aux";

import { v4 as uuidv4 } from "uuid";
import { ITodo, ID } from "./todo.model";
import { database, dbConnectState } from "./db/db";

const LOCAL_STORAGE_KEY = "todos.todoapp";

// Snackbar messages object
const variant = {
  variantSuccess: {
    text: "Success, your data is synced to Firebase",
    severity: "success",
  },
  variantInfo: { text: "You are Online", severity: "info" },
  variantError: {
    text: "It seems you are Offline, check your connection",
    severity: "error",
  },
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [toggleShowIncomplete, setToggleShowIncomplete] = useState(false);
  const [selectEditTodo, setSelectEditTodo] = useState<ITodo[]>([]);
  const [editedName, setEditedName] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [snack, setSnack] = useState(variant.variantSuccess);

  const todoNameRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLInputElement>(null);

  //retrieves the todos if present in the local storage( // * runs only ones)
  useEffect(() => {
    const storeTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    if (storeTodo) setTodos(storeTodo);
  }, []);

  //stores the todos on to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // post the todos on to firebase
  useEffect(() => {
    const Todo = {
      todo: {
        ...todos,
      },
    };
    database.push(Todo);
    handleSnackbarClick(setSnack(variant.variantSuccess));
  }, [todos]);

  // get todos from firebase
  useEffect(() => {
    database.limitToLast(1).once("child_added", (snap) => {
      setTodos(snap.val().todo);
    });
  }, []);

  // check database connection constantly and triggers snackbar
  useEffect(() => {
    dbConnectState.on("value", (snap) => {
      if (snap.val() === true) {
        handleSnackbarClick(setSnack(variant.variantInfo));
        setIsOnline(true);
      } else {
        handleSnackbarClick(setSnack(variant.variantError));
        setIsOnline(false);
      }
    });
  }, [isOnline]);

  // Snackbar handler
  const handleSnackbarClick = (snack: any) => {
    setOpen(true);
  };

  // Snackbar handler
  const handleSnackbarClose = () => {
    setOpen(false);
  };

  //function to add todo
  const handleAddTodo = () => {
    const name = todoNameRef.current!.value;
    if (name === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: uuidv4(),
        title: name,
        completed: false,
      },
    ]);
    todoNameRef.current!.value = "";
  };

  //function to toggle todo item
  const handleTodoCompleteToggle = (id: ID) => {
    const newTodo = [...todos];
    const todo = newTodo.find((todo) => todo.id === id);
    todo!.completed = !todo?.completed;
    setTodos(newTodo);
  };

  //function to delete todo item
  const handleClickTodoDelete = (todoId: string) => {
    const newTodo = [...todos];
    const todo = newTodo.filter((todo) => todo.id !== todoId);
    setTodos(todo);
  };

  // Function to edit todo item
  const handleClickEditTodo = (todoId: string) => {
    const newTodo = [...todos];
    const todo = newTodo.filter((todo) => todo.id === todoId);
    setSelectEditTodo(todo);
    setToggleModal(true);
  };

  // Function to edit selected todo item
  const handleEditTodo = () => {
    const name = ref.current!.value;
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
      <Snackbar
        snack={snack}
        snackbarOpen={open}
        snackbarHandleClick={handleSnackbarClick}
        snackbarHandleClose={handleSnackbarClose}
      />
      <Modal show={toggleModal}>
        <EditTodoForm
          todo={selectEditTodo}
          editRef={ref}
          editTodoHandler={handleEditTodo}
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
        {todos.filter((todo) => todo).length < 1 ? null : (
          <p>
            You have {todos.filter((todo) => todo.completed === false).length}{" "}
            {todos.filter((todo) => todo.completed === false).length > 1
              ? "tasks"
              : "task"}{" "}
            left to complete.
          </p>
        )}
      </div>
      {todos.filter((todo) => todo).length < 1 ? (
        <div className='component'>
          <h3>📝 Start adding Todos...</h3>
        </div>
      ) : (
        <div className='component'>
          {toggleShowIncomplete === true ? (
            <Todos
              todos={todos.filter((todo) =>
                todo.completed === false ? todo.id : null
              )}
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
      )}
    </Aux>
  );
};
export default App;
