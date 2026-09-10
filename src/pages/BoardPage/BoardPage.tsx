import Board from '@components/Board/Board';
import BoardHeader from '@components/BoardHeader/BoardHeader';
import BoardToolbar from '@components/BoardToolbar/BoardToolbar';
import { useParams } from 'react-router';

import styles from './boardPage.module.scss';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';
import useBoardsStore from '@store/Boards/useBoardsStore';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const loadBoards = useBoardsStore((state) => state.actions.loadBoards);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <main className={styles.boardPage}>
      <BoardHeader boardId={id} />
      <BoardToolbar />
      <Board boardId={id} />
    </main>
  );
};

export default BoardPage;
