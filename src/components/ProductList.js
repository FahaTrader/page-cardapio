import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Certifique-se de que este caminho está correto
import './ProductList.css';

const initialCart = [];
const categories = ['Hamburguer', 'Pizza', 'Bebidas'];

const ProductList = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(route?.params?.cart || initialCart);
  const [selectedCategory, setSelectedCategory] = useState('Hamburguer'); // Categoria padrão
  const [tableNumber, setTableNumber] = useState(''); // Para armazenar o número da mesa

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      // Crie uma referência para a coleção
      const productsRef = collection(firestore, 'products');
      // Crie uma consulta com o filtro da categoria
      const q = query(productsRef, where('category', '==', selectedCategory));
      // Obtenha os documentos da consulta
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Products fetched:', productsList);
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCallWaiter = async () => {
    if (!tableNumber) {
      alert('Por favor, insira o número da mesa.');
      return;
    }
  
    try {
      await addDoc(collection(firestore, 'calls'), {
        message: 'Atenção! O garçom foi chamado.',
        tableNumber,
        timestamp: new Date(),
      });
      alert(`Garçom chamado para a mesa ${tableNumber}`);
    } catch (error) {
      console.error('Error calling waiter: ', error);
    }
  };  

  return (
    <div className="container">
      <div className="picker-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-picker"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Número da Mesa"
          className="table-input"
        />
        <button onClick={handleCallWaiter} className="call-waiter-button">
          <span className='popUp'>Ei Garçom!</span>
          <img src={require('../assets/icon-garçom (1).png')} alt='Garçom' className='imgButton' />
        </button>
      </div>
      <div className="product-list">
        {products.map((item) => (
          <div key={item.id} className="product-container">
            {item.image ? (
              <img src={item.image} alt={item.name} className="product-image" />
            ) : (
              <p>No Image Available</p>
            )}
            <div className="desc-container">
              <h3 className="product-name">{item.name}</h3>
              <p className="item-desc">{item.description}</p>
              <p className="item-price">
                {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
                  ? Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  : 'Preço indisponível'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
