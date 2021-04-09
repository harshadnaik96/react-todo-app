import Todo from "../Todo/Todo";
import Aux from "../../hoc/Aux";

const todos = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
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
export default todos;
