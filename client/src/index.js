import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  const consoleWarn = console.warn;
  const consoleError = console.error;

  console.warn = (...args) => {
    if (!/defaultProps/.test(args[0])) {
      consoleWarn(...args);
    }
  };

  console.error = (...args) => {
    if (!/defaultProps/.test(args[0])) {
      consoleError(...args);
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
