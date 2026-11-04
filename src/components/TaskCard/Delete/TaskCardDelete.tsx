import { deleteTaskById } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';
import { memo } from 'react';
import { useParams } from 'react-router';

type DeleteTaskProps = {
  taskId: string;
};

const TaskCardDelete: React.FC<DeleteTaskProps> = memo(({ taskId }) => {
  const queryClient = useQueryClient();
  const { id: boardId } = useParams<{ id: string }>();

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: () => deleteTaskById(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', boardId],
      });
    },

    onError: (error) => {
      console.error('Error deleting task:', error);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteTask();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <section>
      <Popconfirm
        title="Удалить карточку?"
        description="Это действие нельзя отменить."
        onConfirm={handleDelete}
        okText="Удалить"
        cancelText="Отмена"
      >
        <Button danger>Удалить</Button>
      </Popconfirm>
    </section>
  );
});

export default TaskCardDelete;
