import Board from '@components/Board/Board';
import BoardHeader from '@components/BoardHeader/BoardHeader';
import BoardToolbar from '@components/BoardToolbar/BoardToolbar';
import { useParams } from 'react-router';

import styles from './boardPage.module.scss';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { getBoardById } from '@stores/boards/api';
import { useQuery } from '@tanstack/react-query';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: board } = useQuery({
    queryKey: ['currentBoard', id],
    queryFn: () => getBoardById(id!),
  });

  if (!id || !board) {
    return <NotFoundPage />;
  }

  return (
    <main className={styles.boardPage}>
      <BoardHeader boardName={board.name} />
      <BoardToolbar />
      <Board boardId={board.id} />
    </main>
  );
};

export default BoardPage;
