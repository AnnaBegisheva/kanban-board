import type { Task } from '@store/Boards/types';
import TaskCard from '../TaskCardPreview/TaskCardPreview';
import styles from './BoardColumn.module.scss';

const BoardColumn = ({ tasks, title }: { tasks: Task[]; title: string }) => {
  return (
    <ul className={styles.column}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>

        <span className={styles.count}>{tasks.length}</span>
      </header>

      <li className={styles.tasks}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </li>
    </ul>
  );
};

export default BoardColumn;
