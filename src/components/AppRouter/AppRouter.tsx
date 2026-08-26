import { Route, Routes } from 'react-router';

// import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import { type RouteConfig } from './RoutesConfig';

const AppRouter = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              //   route.requiresAuth ? (
              //     <ProtectedRoute>
              //       <Component />
              //     </ProtectedRoute>
              //   ) : (
              <Component />
              //   )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
