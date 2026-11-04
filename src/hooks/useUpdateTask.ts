import { updateTaskById } from '@services/api';
import type { Task } from '@services/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  const tasksQueryKey = ['tasks', boardId];

  return useMutation({
    mutationFn: (newTask: Task) => updateTaskById(newTask.id, newTask),

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: tasksQueryKey,
      });

      const previousTasks = queryClient.getQueryData<Task[]>(tasksQueryKey);

      queryClient.setQueryData<Task[]>(tasksQueryKey, (oldTasks) =>
        oldTasks?.map((oldTask) => (oldTask.id === newTask.id ? { ...oldTask, ...newTask } : oldTask)),
      );

      return { previousTasks };
    },

    onSuccess: (_data, newTask) => {
      void queryClient.invalidateQueries({
        queryKey: ['actions', newTask.id],
      });
    },

    onError: (error, _newTask, context) => {
      if (context?.previousTasks !== undefined) {
        queryClient.setQueryData(tasksQueryKey, context.previousTasks);
      }

      console.error('Error updating task:', error);
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: tasksQueryKey,
      });
    },
  });
};
export default useUpdateTask;
