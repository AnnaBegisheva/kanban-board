import Droppable from '@components/shared/Droppable/Droppable';
import AddNewTask from '@components/Tasks/AddNewTask/AddNewTask';
import TaskCardPreview from '@components/Tasks/TaskCardPreview/TaskCardPreview';
import type { Task } from '@services/types';

import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
  tasks: Task[];
  title: string;
  columnId: string;
  onCardClick: (taskId: string) => void;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ tasks, title, columnId, onCardClick }) => {
  return (
    <ul className={styles.column}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h3>
            {title} ({tasks.length})
          </h3>
        </div>
        <AddNewTask columnId={columnId} />
      </header>

      <>
        <li className={styles.tasks}>
          {tasks.map((task) => (
            <Droppable key={task.id} id={task.id}>
              <TaskCardPreview key={task.id} task={task} onCardClick={onCardClick} />
            </Droppable>
          ))}
        </li>
      </>
    </ul>
  );
};

export default BoardColumn;
