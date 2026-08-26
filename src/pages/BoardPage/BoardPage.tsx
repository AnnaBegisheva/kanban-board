import Board from '@components/Board/Board';
import BoardHeader from '@components/BoardHeader/BoardHeader';
import BoardToolbar from '@components/BoardToolbar/BoardToolbar';
import { useParams } from 'react-router';

import styles from './boardPage.module.scss';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = id ? parseInt(id, 10) : 1;

  return (
    <main className={styles.boardPage}>
      <BoardHeader boardId={boardId} />
      <BoardToolbar />
      <Board boardId={boardId} />
    </main>
  );
};

export default BoardPage;
