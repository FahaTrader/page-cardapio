// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note a mudança aqui
import App from './App';
import './index.css';

const rootElement = document.getElementById('root'); // Certifique-se de que há um elemento com id "root" no HTML
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
