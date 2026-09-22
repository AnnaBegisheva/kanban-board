import Board from '@components/Board/Board';
import BoardHeader from '@components/BoardHeader/BoardHeader';
import BoardToolbar from '@components/BoardToolbar/BoardToolbar';
import { useParams } from 'react-router';

import styles from './boardPage.module.scss';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';
import useBoardsStore from '../../stores/Boards/useBoardsStore';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const loadBoard = useBoardsStore((state) => state.actions.loadBoardById);

  if (!id) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    loadBoard(id);
  }, [loadBoard]);

  return (
    <main className={styles.boardPage}>
      <BoardHeader boardId={id} />
      <BoardToolbar />
      <Board boardId={id} />
    </main>
  );
};

export default BoardPage;
