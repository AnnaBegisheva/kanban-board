import useBoardsStore from '@store/Boards/useBoardsStore';
import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';
import { useEffect, useMemo } from 'react';
import type { Column, Task } from '@store/Boards/types';

const Board = ({ boardId }: { boardId: string }) => {
  const board = useBoardsStore((state) => state.boards.find((b) => b.id === boardId));
  const loadBoardData = useBoardsStore((state) => state.actions.loadBoardData);

  useEffect(() => {
    if (boardId) {
      loadBoardData(boardId);
    }
  }, [boardId, loadBoardData]);

  const columns = board?.columns || [];

  const tasksByColumn = useMemo(() => {
    const result = new Map<Column['id'], Task[]>();

    for (const task of board?.tasks ?? []) {
      const tasksOfColumn = result.get(task.idList);

      if (tasksOfColumn) {
        tasksOfColumn.push(task);
      } else {
        result.set(task.idList, [task]);
      }
    }

    return result;
  }, [board?.tasks]);

  return (
    <section className={styles.board}>
      {columns.map((column) => (
        <BoardColumn key={column.id} tasks={tasksByColumn.get(column.id) ?? []} title={column.name} />
      ))}
    </section>
  );
};

export default Board;
