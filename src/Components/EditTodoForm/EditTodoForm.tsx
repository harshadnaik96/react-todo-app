import "./EditTodoForm.css";
import { ITodo } from "../../todo.model";

interface IEditFormProps {
  todo: ITodo[];
  editRef: React.RefObject<HTMLInputElement>;
  editTodoHandler: () => void;
  editConfirm: () => void;
  cancelEdit: () => void;
}

const EditTodoForm: React.FC<IEditFormProps> = ({
  todo,
  editRef,
  editTodoHandler,
  editConfirm,
  cancelEdit,
}) => {
  const val = todo.map((el) => el.title);
  return (
    <div className='container'>
      <input
        required
        type='text'
        placeholder='edit todo'
        defaultValue={val}
        ref={editRef}
        onChange={editTodoHandler}
      />
      <div>
        {" "}
        <button className='cancel-edit-todo-button' onClick={cancelEdit}>
          cancel
        </button>
        <button className='edit-todo-button' onClick={editConfirm}>
          confirm
        </button>
      </div>
    </div>
  );
};
export default EditTodoForm;
