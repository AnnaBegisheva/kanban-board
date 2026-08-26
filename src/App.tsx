import AppRouter from '@components/AppRouter/AppRouter';
import { routes } from '@components/AppRouter/RoutesConfig';
import { BrowserRouter } from 'react-router';

import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppRouter routes={routes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
