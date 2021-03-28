import React from "react";
import "./AddTodo.css";

const addTodo = ({ todoRef, addTodo }) => {
  return (
    <div className='addtodo-component'>
      <input
        ref={todoRef}
        type='text'
        placeholder='add todo'
        className='addtodo-text'
      />
      <button className='addtodo-button' onClick={addTodo}>
        Add
      </button>
    </div>
  );
};
export default addTodo;
