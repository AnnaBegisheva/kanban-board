import useBoardsStore from '@store/Boards/useBoardsStore';
import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';
import { useMemo } from 'react';
import type { Column, Task } from '@store/Boards/types';

const Board = ({ boardId }: { boardId: number }) => {
  const board = useBoardsStore((state) => state.boards.find((b) => b.id === boardId));
  const columns = board?.columns || [];

  const tasksByColumn = useMemo(() => {
    const result = new Map<Column['id'], Task[]>();

    for (const task of board?.tasks ?? []) {
      const tasksWithCurrentStatus = result.get(task.status);

      if (tasksWithCurrentStatus) {
        tasksWithCurrentStatus.push(task);
      } else {
        result.set(task.status, [task]);
      }
    }

    return result;
  }, [board?.tasks]);

  return (
    <section className={styles.board}>
      {columns.map((column) => (
        <BoardColumn key={column.id} tasks={tasksByColumn.get(column.id) ?? []} title={column.title} />
      ))}
    </section>
  );
};

export default Board;
