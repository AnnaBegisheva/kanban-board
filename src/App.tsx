import AppRouter from '@components/AppRouter/AppRouter';
import { routes } from '@components/AppRouter/RoutesConfig';
import { BrowserRouter } from 'react-router';

import styles from './app.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <BrowserRouter>
          <AppRouter routes={routes} />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
