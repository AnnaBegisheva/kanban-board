import AddNewTask from '@components/AddNewTask/AddNewTask';
import type { Task } from '../../stores/boards/types';
import TaskCard from '../TaskCardPreview/TaskCardPreview';
import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
  tasks: Task[];
  title: string;
  columnId: string;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ tasks, title, columnId }) => {
  return (
    <ul className={styles.column}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <AddNewTask columnId={columnId} />
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
