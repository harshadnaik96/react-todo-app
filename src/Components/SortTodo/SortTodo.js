import "./SortTodo.css";

const sortTodo = ({ todos, showCompleted, showAll }) => {
  return (
    <div>
      <button className='sort-button' onClick={() => showCompleted(todos)}>
        Show Incomplete
      </button>
      <button className='sort-button' onClick={() => showAll(todos)}>
        Show All
      </button>
    </div>
  );
};
export default sortTodo;
