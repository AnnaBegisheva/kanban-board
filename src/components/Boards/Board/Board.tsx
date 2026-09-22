import { getCardsByBoardId, getListsByBoardId } from '@stores/boards/api';
import type { Column, Task } from '@stores/boards/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';

type BoardProps = {
  boardId: string;
};

const buildColumns = (columns: Column[], tasks: Task[]): Column[] => {
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

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const { data: columns } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => getListsByBoardId(boardId),
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => getCardsByBoardId(boardId),
  });

  const tasksByColumn = useMemo(() => {
    if (!columns || !tasks) return [];
    return buildColumns(columns, tasks);
  }, [columns, tasks]);

  return (
    <section className={styles.board}>
      {tasksByColumn.map((column) => (
        <BoardColumn key={column.id} columnId={column.id} tasks={column.tasks ?? []} title={column.name} />
      ))}
    </section>
  );
};

export default Board;
