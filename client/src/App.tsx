import { Component, lazy } from 'solid-js';
import { Router, RouteDefinition, useRoutes } from '@solidjs/router'

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/home'))
  }
]

const App: Component = () => {
  const Routes = useRoutes(routes)
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
