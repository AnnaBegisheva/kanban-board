import useBoardsStore from '@store/Boards/useBoardsStore';
import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';

const Board = ({ boardId }: { boardId: number }) => {
  const { boards } = useBoardsStore();
  const board = boards.find((b) => b.id === boardId);
  const columns = board?.columns || [];

  return (
    <section className={styles.board}>
      {columns.map((column) => (
        <BoardColumn
          key={column.id}
          tasks={(board?.tasks ?? []).filter((task) => task.status === column.id)}
          title={column.title}
        />
      ))}
    </section>
  );
};

export default Board;
