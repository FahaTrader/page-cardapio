import React from "react";
import './Home.css';

export default function Home({ onNavigate }) {
  return (
    <div className="container">
      <img src={require('../assets/icon-garçom.png')} alt="" />
      <h1 className="title">Seja bem vindo ao nosso Cardápio!</h1>
      <button className="buttonCardapio" onClick={onNavigate}>
        Ver Cardápio
      </button>
    </div>
  );
}
