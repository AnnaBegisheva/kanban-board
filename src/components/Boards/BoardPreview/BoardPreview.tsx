import { DeleteOutlined } from '@ant-design/icons';
import type { Board } from '@services/types';
import { Popconfirm } from 'antd';
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
      <Popconfirm
        title="Удалить доску?"
        description="Это действие нельзя отменить."
        onConfirm={() => deleteBoard(board.id)}
        okText="Удалить"
        cancelText="Отмена"
      >
        <button type="button" className={styles.deleteButton}>
          <DeleteOutlined className={styles.deleteIcon} />
          <span>Delete board</span>
        </button>
      </Popconfirm>
    </article>
  );
};

export default BoardPreview;
