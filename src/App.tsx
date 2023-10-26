import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  
  const routes:RouteObject[] = [
    {
      path:'',
      element:<> <Link to="/posts">Posts Page</Link> {' '} <Link to="/sample">Sample Page</Link>
      <br></br><Outlet /></>,
      children: [
        {
          path:'/sample',
          element: <>Sample</>
        },
        {
          path:'/posts',
          Component:PostsPage
        },
        {
          path:'/posts/:id',
          Component:PostDetailPage
          // dynamic route
        }
      ]
    },
  ] 

  // react-router-dom paketinde gelir.
  return useRoutes(routes);

}

export default App;
