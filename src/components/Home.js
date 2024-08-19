import React from "react";
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/product-list')
  };

  return (
    <div className="home-container">
      <img src={require('../assets/icon-garçom.png')} alt="Ícone de Garçom" className="home-image" />
      <h1 className="home-title">Seja bem-vindo ao nosso Cardápio!</h1>
      <button className="home-button" onClick={handleViewMenu}>
        Ver Cardápio
      </button>
    </div>
  );
}
