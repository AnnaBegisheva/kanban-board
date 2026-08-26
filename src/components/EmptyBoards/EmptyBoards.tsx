import styles from './emptyBoards.module.scss';

const EmptyBoards = () => {
  return (
    <section className={styles.emptyState}>
      <h2 className={styles.emptyTitle}>No boards yet</h2>
      <p className={styles.emptyText}>Create your first board to get started.</p>
    </section>
  );
};

export default EmptyBoards;
