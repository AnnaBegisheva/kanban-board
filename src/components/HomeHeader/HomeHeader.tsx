import styles from './homeHeader.module.scss';

const HomeHeader = () => {
  return (
    <header className={styles.header}>
      <p className={styles.label}>KANBAN BOARD</p>
      <h1 className={styles.title}>Your boards</h1>
      <p className={styles.subtitle}>Choose a board to organize your work.</p>
    </header>
  );
};

export default HomeHeader;
