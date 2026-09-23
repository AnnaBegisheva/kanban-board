import { DownOutlined, LineChartOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';

import styles from './boardToolbar.module.scss';

// REVIEW: Когда поиск/фильтры будут реализованы, их состояние должно
// жить не здесь, а в BoardPage или store, чтобы Board мог его читать

const BoardToolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <Input className={styles.search} suffix={<SearchOutlined />} />

        <Avatar.Group size={36}>
          <Avatar src="https://i.pravatar.cc/80?img=47" />
          <Avatar src="https://i.pravatar.cc/80?img=44" />
          <Avatar src="https://i.pravatar.cc/80?img=12" />
          <Avatar src="https://i.pravatar.cc/80?img=32" />

          <Avatar className={styles.more}>+3</Avatar>
        </Avatar.Group>

        <Button>
          Epic
          <DownOutlined />
        </Button>
      </div>

      <div className={styles.right}>
        <div className={styles.group}>
          <span>GROUP BY</span>

          <Button>
            None
            <DownOutlined />
          </Button>
        </div>

        <Button icon={<LineChartOutlined />}>Insights</Button>
      </div>
    </div>
  );
};

export default BoardToolbar;
