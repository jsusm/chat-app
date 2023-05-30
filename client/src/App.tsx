import { Component, lazy } from 'solid-js';
import { Router, RouteDefinition, useRoutes } from '@solidjs/router'
import { AuthProvider } from './context/auth';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/home'))
  },
  {
    path: '/signup',
    component: lazy(() => import('./pages/signup'))
  },
  {
    path: '/signin',
    component: lazy(() => import('./pages/signin'))
  },
]

const App: Component = () => {
  const Routes = useRoutes(routes)
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
