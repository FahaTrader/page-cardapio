// src/App.js
import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Home from './components/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const navigateToProductList = () => {
    setCurrentPage('ProductList');
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentPage === 'Home' ? (
          <Home onNavigate={navigateToProductList} />
        ) : (
          <ProductList />
        )}
      </header>
    </div>
  );
}

export default App;
