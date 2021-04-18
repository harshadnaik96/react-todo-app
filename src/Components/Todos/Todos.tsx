import Todo from "../Todo/Todo";
import Aux from "../../hoc/Aux";

import { ID } from "../../todo.model";

interface TodoList {
  todos: { id: ID; title: string; completed: boolean }[];
  toggleTodo: (id: ID) => void;
  deleteTodo: (id: ID) => void;
  editTodo: (id: ID) => void;
}

const Todos: React.FC<TodoList> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  return (
    <Aux>
      {todos.map((todo, id) => (
        <Todo
          key={id}
          todo={todo}
          checkTodoComplete={toggleTodo}
          handleTodoDelete={deleteTodo}
          handleTodoEdit={editTodo}
        />
      ))}
    </Aux>
  );
};
export default Todos;
