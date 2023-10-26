import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';

function App() {
  
  const routes:RouteObject[] = [
    {
      path:'',
      element:<><Outlet /></>,
      children: [
        {
          path:'/posts',
          Component:PostsPage
        },
        {
          path:'/posts/:id' // dynamic route
        }
      ]
    },
  ] 

  // react-router-dom paketinde gelir.
  return useRoutes(routes);

}

export default App;
