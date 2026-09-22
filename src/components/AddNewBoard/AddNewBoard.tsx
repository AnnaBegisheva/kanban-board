import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewBoardForm from '@components/NewBoardForm/NewBoardForm';
import { useModal } from '@hooks/useModal';

import type { Board } from '../../stores/Boards/types';
import styles from './addNewBoard.module.scss';
import useBoardsStore from '../../stores/Boards/useBoardsStore';

const AddNewBoard = () => {
  const [isOpen, open, close] = useModal();
  const addBoard = useBoardsStore((state) => state.actions.addBoard);

  const handleCreateBoard = (title: string) => {
    const newBoard: Board = {
      id: new Date().getTime().toString(),
      name: title[0].toUpperCase() + title.slice(1),
      columns: [],
      tasks: [],
    };
    addBoard(newBoard);
    close();
  };

  return (
    <>
      <button type="button" onClick={open} className={styles.primaryButton}>
        + New board
      </button>

      <ModalWindow open={isOpen} onClose={close}>
        <NewBoardForm onSuccess={handleCreateBoard} />
      </ModalWindow>
    </>
  );
};

export default AddNewBoard;
