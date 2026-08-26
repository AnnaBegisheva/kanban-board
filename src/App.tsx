import { routes } from '@components/AppRouter/RoutesConfig';
import styles from './app.module.scss';
import AppRouter from '@components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router';

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
