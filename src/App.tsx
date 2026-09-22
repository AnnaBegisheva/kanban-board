import AppRouter from '@components/shared/AppRouter/AppRouter';
import { routes } from '@components/shared/AppRouter/RoutesConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import styles from './app.module.scss';

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
