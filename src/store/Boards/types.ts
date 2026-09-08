export type Column = {
  id: 'todo' | 'progress' | 'review' | 'done';
  title: string;
};

export type Board = {
  id: number;
  name: string;
  columns: Column[];
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  assignee: string;
  description: string;
  status: Column['id'];
  date: string;
  // REVIEW: категории прописать константой и выводить через typeof
  // TODO: будут ли категории меняться / задаваться при создании доски? если да, то как лучше их обрабатывать и стилизовать?
  category?: 'billing' | 'accounts' | 'forms' | 'other';
};

export type TaskValues = Omit<Task, 'id' | 'status' | 'date'>;
