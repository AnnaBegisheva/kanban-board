import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewTaskForm from '@components/NewTaskForm/NewTaskForm';
import { useModal } from '@hooks/useModal';
import { Button } from 'antd';

import type { Task, TaskValues } from '../../stores/Boards/types';
import styles from './addNewTask.module.scss';
import useBoardsStore from '../../stores/Boards/useBoardsStore';

type AddNewTaskProps = {
  boardId: string;
};

const AddNewTask: React.FC<AddNewTaskProps> = ({ boardId }) => {
  const [isOpen, open, close] = useModal();
  const addTask = useBoardsStore((state) => state.actions.addTask);

  const handleCreateTask = (values: TaskValues) => {
    const newTask: Task = {
      ...values,
      name: values.name[0].toUpperCase() + values.name.slice(1),
      id: new Date().getTime().toString(),
      // TODO: Implement logic to assign the correct idList based on the selected column in the form
      idList: '',
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
