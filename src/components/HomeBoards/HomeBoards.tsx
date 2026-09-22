import BoardPreview from '@components/BoardPreview/BoardPreview';
import EmptyBoards from '@components/EmptyBoards/EmptyBoards';

import styles from './homeBoards.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBoardById, getBoards } from '@stores/boards/api';

const HomeBoards: React.FC  = () => {
  const queryClient = useQueryClient();
  const { data: boards } = useQuery({
    queryKey: ['boards'],
    queryFn: () => getBoards(),
  });

  const { mutate: deleteBoard } = useMutation({
    mutationFn: (boardId: string) => deleteBoardById(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
    onError: (error) => {
      console.error('Error deleting board:', error);
    },
  });

  if (!boards?.length) {
    return <EmptyBoards />;
  }

  return (
    <div className={styles.homeBoards}>
      <section className={styles.boards}>
        {boards.map((board) => (
          <BoardPreview key={board.id} board={board} deleteBoard={deleteBoard} />
        ))}
      </section>
    </div>
  );
};

export default HomeBoards;
