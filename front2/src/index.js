import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
