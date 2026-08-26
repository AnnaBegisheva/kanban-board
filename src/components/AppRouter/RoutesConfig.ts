import BoardPage from '@pages/BoardPage/BoardPage';
import HomePage from '@pages/HomePage/HomePage';
// import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title: string;
  requiresAuth?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    title: 'Главная',
  },
  {
    path: '/board/:id',
    component: BoardPage,
    title: 'Доска',
  },
  //   {
  //     path: '*',
  //     component: NotFoundPage,
  //     title: 'Страница не найдена',
  //   },
];
