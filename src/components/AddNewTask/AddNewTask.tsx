import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewTaskForm from '@components/NewTaskForm/NewTaskForm';
import { useModal } from '@hooks/useModal';
import { Button } from 'antd';

import type { Task, TaskValues } from '../../stores/boards/types';
import styles from './addNewTask.module.scss';
import { createTask } from '@stores/boards/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddNewTaskProps = {
  columnId: string;
};

const AddNewTask: React.FC<AddNewTaskProps> = ({ columnId }) => {
  const [isOpen, open, close] = useModal();
  const queryClient = useQueryClient();

  const { mutate: addTask } = useMutation({
    mutationFn: ({ columnId, newTask }: { columnId: string; newTask: Task }) => createTask(columnId, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    },
  });

  const handleCreateTask = (values: TaskValues) => {
    const newTask: Task = {
      ...values,
      name: values.name[0].toUpperCase() + values.name.slice(1),
      idList: columnId,
      id: '',
    };
    addTask({ columnId, newTask });
    close();
  };

  return (
    <>
      <Button type="text" className={styles.primaryButton} onClick={open}>
        +
      </Button>

      <ModalWindow open={isOpen} onClose={close}>
        <NewTaskForm onSuccess={handleCreateTask} />
      </ModalWindow>
    </>
  );
};

export default AddNewTask;
