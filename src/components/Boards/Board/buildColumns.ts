import type { Column, Task } from '@services/types';

export const buildColumns = (columns: Column[], tasks: Task[]): Column[] => {
  const columnsMap = new Map<string, Column>();

  columns.forEach((column) => {
    columnsMap.set(column.id, { ...column, tasks: [] });
  });

  tasks.forEach((task) => {
    const column = columnsMap.get(task.idList);
    if (column) {
      column.tasks?.push(task);
    }
  });

  return [...columnsMap.values()];
};
