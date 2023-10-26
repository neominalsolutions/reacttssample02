import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';

function App() {
  
  const routes:RouteObject[] = [
    {
      path:'/posts',
      Component:PostsPage
    }
  ] 

  // react-router-dom paketinde gelir.
  return useRoutes(routes);

}

export default App;
