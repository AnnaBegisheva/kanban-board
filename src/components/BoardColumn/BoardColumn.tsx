import type { Task } from '../../assets/data';
import TaskCard from '../TaskCardPreview/TaskCardPreview';
import styles from './BoardColumn.module.scss';

const BoardColumn = ({ tasks, title }: { tasks: Task[]; title: string }) => {
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>

        <span className={styles.count}>{tasks.length}</span>
      </header>

      <main className={styles.tasks}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </main>
    </div>
  );
};

export default BoardColumn;
