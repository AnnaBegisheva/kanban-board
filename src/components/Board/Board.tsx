import useBoardsStore from '../../stores/Boards/useBoardsStore';
import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';
import { useEffect, useMemo } from 'react';
import type { Column, Task } from '../../stores/Boards/types';

type BoardProps = {
  boardId: string;
};

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const board = useBoardsStore((state) => state.boards.find((b) => b.id === boardId));
  const loadBoardData = useBoardsStore((state) => state.actions.loadBoardData);

  useEffect(() => {
    if (boardId) {
      loadBoardData(boardId);
    }
  }, [boardId, loadBoardData]);

  const columns = board?.columns || [];

  const tasksByColumn = useMemo(
    () =>
      (board?.tasks ?? []).reduce<Map<Column['id'], Task[]>>((result, task) => {
        const tasks = result.get(task.idList) ?? [];

        tasks.push(task);
        result.set(task.idList, tasks);

        return result;
      }, new Map()),
    [board?.tasks],
  );

  return (
    <section className={styles.board}>
      {columns.map((column) => (
        <BoardColumn key={column.id} tasks={tasksByColumn.get(column.id) ?? []} title={column.name} />
      ))}
    </section>
  );
};

export default Board;
