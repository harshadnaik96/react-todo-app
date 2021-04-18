import "./AddTodo.css";

interface IAddTodoProps {
  todoRef: React.RefObject<HTMLInputElement>;
  addTodo: () => void;
}

const AddTodo: React.FC<IAddTodoProps> = ({ todoRef, addTodo }) => {
  return (
    <div className='addtodo-component'>
      <input
        id='todoText'
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
export default AddTodo;
