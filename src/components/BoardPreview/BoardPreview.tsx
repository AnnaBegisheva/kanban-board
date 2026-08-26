import { DeleteOutlined } from '@ant-design/icons';
import styles from './boardPreview.module.scss';
import { Link } from 'react-router';

type BoardPreviewProps = {
  board: {
    id: number;
    name: string;
  };
  deleteBoard: (id: number) => void;
};

const BoardPreview = ({ board, deleteBoard }: BoardPreviewProps) => {

  return (
    <article key={board.id} className={styles.board}>
      <Link to={`/board/${board.id}`} className={styles.boardTitle}>
        {board.name}
      </Link>
      <button type="button" onClick={() => deleteBoard(board.id)} className={styles.deleteButton}>
        <DeleteOutlined className={styles.deleteIcon} />
        <span>Delete board</span>
      </button>
    </article>
  );
};

export default BoardPreview;
