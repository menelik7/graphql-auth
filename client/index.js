import React from 'react';
import { createRoot } from 'react-dom/client';

const el = document.getElementById('root');

const root = createRoot(el);
const Root = () => {
  return <div>Auth Starter</div>;
};

root.render(<Root />);
