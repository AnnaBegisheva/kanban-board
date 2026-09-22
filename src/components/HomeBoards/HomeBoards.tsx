import BoardPreview from '@components/BoardPreview/BoardPreview';
import EmptyBoards from '@components/EmptyBoards/EmptyBoards';

import styles from './homeBoards.module.scss';
import useBoardsStore from '../../stores/Boards/useBoardsStore';
import { useEffect } from 'react';

const HomeBoards = () => {
  const boards = useBoardsStore((state) => state.boards);
  const deleteBoard = useBoardsStore((state) => state.actions.deleteBoard);

  const loadBoards = useBoardsStore((state) => state.actions.loadBoards);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  if (!boards.length) {
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
