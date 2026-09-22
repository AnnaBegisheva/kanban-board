export type Column = {
  id: string;
  name: string;
};

export type Board = {
  id: string;
  name: string;
  closed?: boolean;
  columns: Column[];
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  assignee: string;
  description: string;
  idList: Column['id'];
  date: string;
  // REVIEW: категории прописать константой и выводить через typeof
  // TODO: будут ли категории меняться / задаваться при создании доски? если да, то как лучше их обрабатывать и стилизовать?
  category?: 'billing' | 'accounts' | 'forms' | 'other'; // label
};

export type TaskValues = Omit<Task, 'id' | 'idList' | 'date'>;
