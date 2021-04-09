import "./EditTodoForm.css";

const editTodoForm = ({ editTodoChange, editConfirm, cancelEdit, todo }) => {
  const val = todo.map((el) => el.title);
  return (
    <div className='container'>
      <input
        required
        type='text'
        placeholder='edit todo'
        defaultValue={val}
        onChange={editTodoChange}
      />
      <div>
        {" "}
        <button className='cancel-edit-todo-button' onClick={cancelEdit}>
          cancel
        </button>
        <button
          className='edit-todo-button'
          onClick={() => editConfirm(todo.id)}
        >
          confirm
        </button>
      </div>
    </div>
  );
};
export default editTodoForm;
