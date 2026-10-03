import ModalWindow from '@components/shared/ModalWindow/ModalWindow';
import TaskCard from '@components/TaskCard/TaskCard/TaskCard';
import AddNewTask from '@components/Tasks/AddNewTask/AddNewTask';
import TaskCardPreview from '@components/Tasks/TaskCardPreview/TaskCardPreview';
import { useModal } from '@hooks/useModal';
import type { Task } from '@services/types';
import { useState } from 'react';

import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
  tasks: Task[];
  title: string;
  columnId: string;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ tasks, title, columnId }) => {
  const [isOpen, open, close] = useModal();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const handleCardClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    open();
  };

  return (
    <>
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
            <TaskCardPreview key={task.id} task={task} onCardClick={handleCardClick} />
          ))}
        </li>
      </ul>
      <ModalWindow open={isOpen && selectedTask !== null} onClose={close}>
        {selectedTask ? <TaskCard task={selectedTask} /> : null}
      </ModalWindow>
    </>
  );
};

export default BoardColumn;
