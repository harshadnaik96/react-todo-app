import "./Todo.css";
import { ITodo, ID } from "../../todo.model";

interface TodoProps {
  todo: ITodo;
  checkTodoComplete: (id: ID) => void;
  handleTodoDelete: (id: ID) => void;
  handleTodoEdit: (id: ID) => void;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  checkTodoComplete,
  handleTodoDelete,
  handleTodoEdit,
}) => {
  const handleTodoClick = () => {
    checkTodoComplete(todo.id);
  };

  return (
    <div className='todo-component'>
      <input
        className='todo-input'
        type='checkbox'
        checked={todo.completed}
        onChange={() => handleTodoClick()}
      />
      {todo.completed ? (
        <p className='todo-completed'>{todo.title}</p>
      ) : (
        <p className='todo-text'>{todo.title}</p>
      )}
      <div className='todo-button-box'>
        <button
          onClick={() => handleTodoEdit(todo.id)}
          className='todo-button-edit'
        >
          Edit
        </button>
        <button
          onClick={() => handleTodoDelete(todo.id)}
          className='todo-button'
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default Todo;
