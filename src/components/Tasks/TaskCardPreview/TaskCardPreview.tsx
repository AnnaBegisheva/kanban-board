import { BookOutlined } from '@ant-design/icons';
import Draggable from '@components/shared/Draggable/Draggable';
import type { Task } from '@services/types';

import styles from './taskCardPreview.module.scss';
type TaskCardPreviewProps = {
  task: Task;
  onCardClick: (taskId: string) => void;
};

const TaskCardPreview: React.FC<TaskCardPreviewProps> = ({ task, onCardClick }) => {
  return (
    <Draggable id={task.id}>
      <article className={styles.card} onClick={() => onCardClick(task.id)}>
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
        </footer>
      </article>
    </Draggable>
  );
};

export default TaskCardPreview;
