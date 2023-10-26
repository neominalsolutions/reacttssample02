import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import MuiComponentSample from './components/mui/MuiComponentSample';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';

function App() {

  const isMenuOpen = true;
  
  const routes:RouteObject[] = [
    {
      path:'',
      element:<>

        {/* <Menu  anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }} open={isMenuOpen}>
        <MenuItem>
          <Avatar /> <Link to="/sample">Sample Page</Link>
        </MenuItem>
        <MenuItem>
          <Avatar /> <Link to='/mui-sample'>MUI Sample</Link>
        </MenuItem>
        </Menu> */}

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor:'GrayText' }}>
        <Typography sx={{ minWidth: 100 }}>
          <Link to="/posts">Posts Page</Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link to="/sample">Sample Page</Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link to="/mui-sample">MuI Page</Link>
        </Typography>
      </Box>
    
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
        },
        {
          path:'mui-sample',
          Component:MuiComponentSample
        }
      ]
    },
  ] 

  // react-router-dom paketinde gelir.
  return useRoutes(routes);

}

export default App;
