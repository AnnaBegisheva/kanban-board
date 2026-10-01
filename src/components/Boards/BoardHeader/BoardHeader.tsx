import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router';

import styles from './boardHeader.module.scss';

type BoardHeaderProps = {
  boardName: string;
};

const BoardHeader: React.FC<BoardHeaderProps> = ({ boardName }) => {
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
        <div className={styles.actions}>
          <Button type="text" icon={<StarOutlined />} />
          <Button type="text" icon={<EllipsisOutlined />} />
        </div>
      </header>
    </>
  );
};

export default BoardHeader;
