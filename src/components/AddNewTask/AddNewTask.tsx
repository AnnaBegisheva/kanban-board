import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewTaskForm from '@components/NewTaskForm/NewTaskForm';
import { useModal } from '@hooks/useModal';
import { Button } from 'antd';

import type { Task, TaskValues } from '@store/Boards/types';
import styles from './addNewTask.module.scss';
import useBoardsStore from '@store/Boards/useBoardsStore';

const AddNewTask = ({ boardId }: { boardId: string }) => {
  const [isOpen, open, close] = useModal();
  const addTask = useBoardsStore((state) => state.actions.addTask);

  const handleCreateTask = (values: TaskValues) => {
    const newTask: Task = {
      ...values,
      title: values.title[0].toUpperCase() + values.title.slice(1),
      id: new Date().getTime().toString(),
      status: 'todo',
      date: new Date().toISOString(),
    };
    addTask(boardId, newTask);
    close();
  };

  return (
    <>
      <Button type="text" className={styles.primaryButton} onClick={open}>
        + Add new task
      </Button>

      <ModalWindow open={isOpen} onClose={close}>
        <NewTaskForm onSuccess={handleCreateTask} />
      </ModalWindow>
    </>
  );
};

export default AddNewTask;
