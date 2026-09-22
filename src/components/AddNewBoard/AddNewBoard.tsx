import ModalWindow from '@components/ModalWindow/ModalWindow';
import NewBoardForm from '@components/NewBoardForm/NewBoardForm';
import { useModal } from '@hooks/useModal';
import styles from './addNewBoard.module.scss';

import { createBoard } from '@stores/boards/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddNewBoard: React.FC = () => {
  const [isOpen, open, close] = useModal();

  const queryClient = useQueryClient();

  const { mutate: addBoard } = useMutation({
    mutationFn: (name: string) => createBoard(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
    onError: (error) => {
      console.error('Error creating board:', error);
    },
  });

  const handleCreateBoard = (title: string) => {
    addBoard(title);
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
