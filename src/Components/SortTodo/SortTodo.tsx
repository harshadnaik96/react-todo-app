import "./SortTodo.css";
import { ITodo } from "../../todo.model";

interface ISorted {
  todos: ITodo[];
  showCompleted: () => void;
  showAll: () => void;
}
const SortTodo: React.FC<ISorted> = ({ todos, showCompleted, showAll }) => {
  return (
    <div>
      <button className='sort-button' onClick={showCompleted}>
        Show Incomplete
      </button>
      <button className='sort-button' onClick={showAll}>
        Show All
      </button>
    </div>
  );
};
export default SortTodo;
