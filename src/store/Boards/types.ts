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
  category?: 'billing' | 'accounts' | 'forms' | 'other';
};

export type TaskValues = Omit<Task, 'id' | 'status' | 'date'>;
