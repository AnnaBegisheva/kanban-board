import styles from './HomePage.module.scss';

import HomeHeader from '@components/HomeHeader/HomeHeader';
import HomeBoards from '@components/HomeBoards/HomeBoards';

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <HomeHeader />
      <HomeBoards />
    </main>
  );
};

export default HomePage;
