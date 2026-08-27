import AddNewBoard from '@components/AddNewBoard/AddNewBoard';
import BoardPreview from '@components/BoardPreview/BoardPreview';
import EmptyBoards from '@components/EmptyBoards/EmptyBoards';

import styles from './homeBoards.module.scss';
import useBoardsStore from '@store/Boards/useBoardsStore';

const HomeBoards = () => {
  const boards = useBoardsStore((state) => state.boards);
  const { actions } = useBoardsStore();

  const deleteBoard = (id: number) => {
    actions.deleteBoard(id);
  };

  if (!boards.length) {
    return <EmptyBoards />;
  }

  //TODO: как тут лучше разместить кнопку? пока поставила ее фиксом, но это не адаптивно + хочется, чтобы была вровень с текстом

  return (
    <div className={styles.homeBoards}>
      <div className={styles.addBtnWrapper}>
        <AddNewBoard />
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
