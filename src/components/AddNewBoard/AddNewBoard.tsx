import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewBoardForm from '@components/NewBoardForm/NewBoardForm';
import { useModal } from '@hooks/useModal';
import type { Dispatch, SetStateAction } from 'react';

import type { Board } from '../../assets/data';
import styles from './addNewBoard.module.scss';

const AddNewBoard = ({ setBoards }: { setBoards: Dispatch<SetStateAction<Board[]>> }) => {
  const [isOpen, open, close] = useModal();

  const handleCreateBoard = (title: string) => {
    const newBoard: Board = {
      id: new Date().getTime(),
      name: title,
      columns: [],
      tasks: [],
    };
    setBoards((current) => [...current, newBoard]);
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
