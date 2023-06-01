import { Component, lazy } from 'solid-js';
import { Router, RouteDefinition, useRoutes } from '@solidjs/router'
import { AuthProvider } from './context/auth';
import { ChatProvider } from './context/chats';

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
  {
    path: '/chats/create',
    component: lazy(() => import('./pages/createChat'))
    },
]

const App: Component = () => {
  const Routes = useRoutes(routes)
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Routes />
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
