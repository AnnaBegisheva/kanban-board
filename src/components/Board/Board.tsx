import { starterBoards } from '../../assets/data';
import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';

const Board = ({ boardId }: { boardId: number }) => {
  const board = starterBoards.find((b) => b.id === boardId) || starterBoards[0];
  const columns = board.columns || [];

  return (
    <section className={styles.board}>
      {columns.map((column) => (
        <BoardColumn key={column.id} tasks={board.tasks.filter(
      (task) => task.status === column.id,
    )} title={column.title} />
      ))}
    </section>
  );
};

export default Board;
