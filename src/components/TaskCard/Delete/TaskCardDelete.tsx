import { deleteTaskById } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';
import { memo } from 'react';

type DeleteTaskProps = {
  taskId: string;
};

const TaskCardDelete: React.FC<DeleteTaskProps> = memo(({ taskId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationFn: () => deleteTaskById(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },

    onError: (error) => {
      console.error('Error deleting task:', error);
    },
  });

  return (
    <section>
      <Popconfirm
        title="Удалить карточку?"
        description="Это действие нельзя отменить."
        onConfirm={() => deleteTask()}
        okText="Удалить"
        cancelText="Отмена"
      >
        <Button danger>Удалить</Button>
      </Popconfirm>
    </section>
  );
});

export default TaskCardDelete;
