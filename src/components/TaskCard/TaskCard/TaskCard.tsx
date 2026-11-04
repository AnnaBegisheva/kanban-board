import useUpdateTask from '@hooks/useUpdateTask';
import type { Task } from '@services/types';
import { memo, useCallback } from 'react';

import TaskCardColumn from '../Column/TaskCardColumn';
import TaskCardDelete from '../Delete/TaskCardDelete';
import TaskCardDescription from '../Description/TaskCardDescription';
import TaskCardHistory from '../History/TaskCardHistory';
import TaskCardMetaData from '../MetaData/TaskCardMetaData';
import TaskCardTitle from '../Title/TaskCardTitle';
import styles from './taskCard.module.scss';

type TaskCardProps = {
  task: Task;
  boardId: string;
};

const TaskCard: React.FC<TaskCardProps> = memo(({ task, boardId }) => {
  const { mutate: updateTask } = useUpdateTask(boardId);

  const handleUpdateTitle = useCallback(
    (name: string) => {
      if (name === task.name) {
        return;
      }

      updateTask({
        ...task,
        name,
      });
    },
    [task, updateTask],
  );

  const handleUpdateStatus = useCallback(
    (idList: string) => {
      if (idList === task.idList) {
        return;
      }

      updateTask({
        ...task,
        idList,
      });
    },
    [task, updateTask],
  );

  const handleUpdateDescription = useCallback(
    (desc: string) => {
      if (desc === (task.desc ?? '')) {
        return;
      }

      updateTask({
        ...task,
        desc,
      });
    },
    [task, updateTask],
  );

  return (
    <div className={styles.cardDetails}>
      <TaskCardTitle taskName={task.name} onSave={handleUpdateTitle} />
      <TaskCardColumn value={task.idList} onChange={handleUpdateStatus} />
      <TaskCardDescription desc={task.desc ?? ''} onSave={handleUpdateDescription} />
      <TaskCardMetaData date={task.date ?? ''} dateLastActivity={task.dateLastActivity ?? ''} />
      <TaskCardHistory taskId={task.id} />
      <TaskCardDelete taskId={task.id} />
    </div>
  );
});

export default TaskCard;
