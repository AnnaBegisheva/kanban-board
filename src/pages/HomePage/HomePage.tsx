import HomeBoards from '@components/Home/HomeBoards/HomeBoards';
import HomeHeader from '@components/Home/HomeHeader/HomeHeader';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <HomeHeader />
      <HomeBoards />
    </main>
  );
};

export default HomePage;
