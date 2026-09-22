import { DeleteOutlined } from '@ant-design/icons';
import type { Board } from '@stores/boards/types';
import { Link } from 'react-router';

import styles from './boardPreview.module.scss';

type BoardPreviewProps = {
  board: Board;
  deleteBoard: (id: string) => void;
};

const BoardPreview = ({ board, deleteBoard }: BoardPreviewProps) => {
  return (
    <article key={board.id} className={`${styles.board} ${board.closed ? styles.closed : ''}`}>
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
