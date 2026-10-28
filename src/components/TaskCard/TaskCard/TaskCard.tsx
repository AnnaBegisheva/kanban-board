import { updateTaskById } from '@services/api';
import type { Task } from '@services/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router';

import TaskCardColumn from '../Column/TaskCardColumn';
import TaskCardDelete from '../Delete/TaskCardDelete';
import TaskCardDescription from '../Description/TaskCardDescription';
import TaskCardHistory from '../History/TaskCardHistory';
import TaskCardMetaData from '../MetaData/TaskCardMetaData';
import TaskCardTitle from '../Title/TaskCardTitle';
import styles from './taskCard.module.scss';

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = memo(({ task }) => {
  const queryClient = useQueryClient();
  const { id: boardId } = useParams<{ id: string }>();

  const { mutate: updateTask } = useMutation({
    mutationFn: (newTask: Task) => updateTaskById(task.id, newTask),

    onMutate: async (newTask) => {
      const queryKey = ['tasks', boardId];

      await queryClient.cancelQueries({ queryKey });

      const previousTasks = queryClient.getQueryData<Task[]>(queryKey);

      queryClient.setQueryData<Task[]>(queryKey, (oldTasks) =>
        oldTasks?.map((oldTask) => (oldTask.id === newTask.id ? { ...oldTask, ...newTask } : oldTask)),
      );

      return { previousTasks };
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['actions', task.id],
      });
    },

    onError: (error, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', boardId], context.previousTasks);
      }

      console.error('Error updating task:', error);
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: ['tasks', boardId],
      });
    },
  });

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
