import todo from "../Todo/Todo";
import "./EditTodoForm.css";

const editTodoForm = ({ todo, editTodoChange, editConfirm, cancelEdit }) => {
  let val = todo.map((el) => el.title);
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
