import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        {
          path: '',
          element: <Landing />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
