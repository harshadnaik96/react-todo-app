export type ID = string;

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface ISortedTodos {
  todos: { id: string; title: string; completed: boolean };
}
