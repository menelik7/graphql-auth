import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Landing />,
    },
  ]);

  return (
    <div className='container'>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}
