import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewBoardForm from '@components/NewBoardForm/NewBoardForm';
import { useModal } from '@hooks/useModal';

import type { Board } from '@store/Boards/types';
import styles from './addNewBoard.module.scss';
import useBoardsStore from '@store/Boards/useBoardsStore';

const AddNewBoard = () => {
  const [isOpen, open, close] = useModal();
  const { actions } = useBoardsStore();

  const handleCreateBoard = (title: string) => {
    const newBoard: Board = {
      id: new Date().getTime(),
      name: title,
      columns: [],
      tasks: [],
    };
    actions.addBoard(newBoard);
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
