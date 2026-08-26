import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './boardHeader.module.scss';
import { Link } from 'react-router';
import { starterBoards } from '../../assets/data';
import AddNewTask from '@components/AddNewTask/AddNewTask';

const BoardHeader = ({ boardId }: { boardId: number }) => {
  const boardName = starterBoards.find((board) => board.id === boardId)?.name || 'Unnamed Board';
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
        <AddNewTask />

        <div className={styles.actions}>
          <Button type="text" icon={<StarOutlined />} />
          <Button type="text" icon={<EllipsisOutlined />} />
        </div>
      </header>
    </>
  );
};

export default BoardHeader;
