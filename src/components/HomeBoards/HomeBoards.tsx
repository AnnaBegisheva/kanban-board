import EmptyBoards from '@components/EmptyBoards/EmptyBoards';
import styles from './homeBoards.module.scss';
import BoardPreview from '@components/BoardPreview/BoardPreview';
import { useState } from 'react';

import { starterBoards, type Board } from '../../assets/data';
import AddNewBoard from '@components/AddNewBoard/AddNewBoard';

const HomeBoards = () => {
  const [boards, setBoards] = useState<Board[]>(starterBoards);

  const deleteBoard = (id: string | number) => {
    setBoards((current) => current.filter((board) => board.id !== id));
  };

  if (!boards.length) {
    return <EmptyBoards />;
  }

  //TODO: как тут лучше разместить кнопку? пока поставила ее фиксом, но это не адаптивно + хочется, чтобы была вровень с текстом

  return (
    <div className={styles.homeBoards}>
      <div className={styles.addBtnWrapper}>
        <AddNewBoard setBoards={setBoards} />
      </div>

      <section className={styles.boards}>
        {boards.map((board) => (
          <BoardPreview key={board.id} board={board} deleteBoard={deleteBoard} />
        ))}
      </section>
    </div>
  );
};

export default HomeBoards;
