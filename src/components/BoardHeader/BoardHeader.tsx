import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import AddNewTask from '@components/AddNewTask/AddNewTask';
import { Button } from 'antd';
import { Link } from 'react-router';

import styles from './boardHeader.module.scss';
import useBoardsStore from '@store/Boards/useBoardsStore';

const BoardHeader = ({ boardId }: { boardId: string }) => {
  const boardName =
    useBoardsStore((state) => state.boards.find((board) => board.id === boardId)?.name) || 'Unnamed Board';
  return (
    <>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbsLink}>
          Home
        </Link>
        <span>/</span>
        <span>{boardName}</span>
      </div>

      <header className={styles.header}>
        <AddNewTask boardId={boardId} />
        <div className={styles.actions}>
          <Button type="text" icon={<StarOutlined />} />
          <Button type="text" icon={<EllipsisOutlined />} />
        </div>
      </header>
    </>
  );
};

export default BoardHeader;
