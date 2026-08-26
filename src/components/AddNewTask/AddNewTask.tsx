import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewTaskForm from '@components/NewTaskForm/NewTaskForm';
import { useModal } from '@hooks/useModal';
import { Button } from 'antd';

import type { Task, TaskValues } from '../../assets/data';
import styles from './addNewTask.module.scss';

const AddNewTask = () => {
  const [isOpen, open, close] = useModal();

  const handleCreateTask = (values: TaskValues) => {
    const newTask: Task = {
      ...values,
      id: new Date().getTime().toString(),
      status: 'todo',
      date: new Date().toISOString(),
    };
    console.log('Form submitted with values:', newTask);
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
