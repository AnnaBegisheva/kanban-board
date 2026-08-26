import { Avatar } from 'antd';
import { BookOutlined } from '@ant-design/icons';

import styles from './taskCardPreview.module.scss';
import type { Task } from '../../assets/data';

const TaskCardPreview = ({ task }: { task: Task }) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>

      <span className={`${styles.category} ${task.category ? styles[task.category] : ''}`}>
        {task.category?.toUpperCase()}
      </span>

      <footer className={styles.footer}>
        <div className={styles.id}>
          <span className={styles.icon}>
            <BookOutlined />
          </span>

          {task.id}
        </div>

        {task.assignee && <Avatar size={28} src={task.assignee} />}
      </footer>
    </article>
  );
};

export default TaskCardPreview;
