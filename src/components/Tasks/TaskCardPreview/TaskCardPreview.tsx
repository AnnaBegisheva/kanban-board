import { BookOutlined } from '@ant-design/icons';
import type { Task } from '@stores/boards/types';
import { Avatar } from 'antd';

import styles from './taskCardPreview.module.scss';

const TaskCardPreview = ({ task }: { task: Task }) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{task.name}</h3>

      {task.category && (
        <span className={`${styles.category} ${styles[task.category]}`}>{task.category.toUpperCase()}</span>
      )}

      <footer className={styles.footer}>
        <div className={styles.id}>
          <span className={styles.icon}>
            <BookOutlined />
          </span>

          {task.id}
        </div>
        {/* REVIEW: assignee is a string, not url -> add url */}
        {task.assignee && <Avatar size={28} src={task.assignee} />}
      </footer>
    </article>
  );
};

export default TaskCardPreview;
