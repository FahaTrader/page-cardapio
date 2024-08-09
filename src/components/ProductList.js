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
<<<<<<< HEAD
        <svg width="600px" height="600px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 18H19.75H19ZM5 14.584H5.75C5.75 14.2859 5.57345 14.016 5.30028 13.8967L5 14.584ZM19 14.584L18.6997 13.8967C18.4265 14.016 18.25 14.2859 18.25 14.584H19ZM15.75 7C15.75 7.41421 16.0858 7.75 16.5 7.75C16.9142 7.75 17.25 7.41421 17.25 7H15.75ZM6.75 7C6.75 7.41421 7.08579 7.75 7.5 7.75C7.91421 7.75 8.25 7.41421 8.25 7H6.75ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM10 22.75C10.4142 22.75 10.75 22.4142 10.75 22C10.75 21.5858 10.4142 21.25 10 21.25V22.75ZM7 4.25C3.82436 4.25 1.25 6.82436 1.25 10H2.75C2.75 7.65279 4.65279 5.75 7 5.75V4.25ZM17 5.75C19.3472 5.75 21.25 7.65279 21.25 10H22.75C22.75 6.82436 20.1756 4.25 17 4.25V5.75ZM9 21.25C8.03599 21.25 7.38843 21.2484 6.90539 21.1835C6.44393 21.1214 6.24643 21.0142 6.11612 20.8839L5.05546 21.9445C5.51093 22.4 6.07773 22.5857 6.70552 22.6701C7.31174 22.7516 8.07839 22.75 9 22.75V21.25ZM4.25 18C4.25 18.9216 4.24841 19.6883 4.32991 20.2945C4.41432 20.9223 4.59999 21.4891 5.05546 21.9445L6.11612 20.8839C5.9858 20.7536 5.87858 20.5561 5.81654 20.0946C5.75159 19.6116 5.75 18.964 5.75 18H4.25ZM18.25 18C18.25 18.964 18.2484 19.6116 18.1835 20.0946C18.1214 20.5561 18.0142 20.7536 17.8839 20.8839L18.9445 21.9445C19.4 21.4891 19.5857 20.9223 19.6701 20.2945C19.7516 19.6883 19.75 18.9216 19.75 18H18.25ZM15 22.75C15.9216 22.75 16.6883 22.7516 17.2945 22.6701C17.9223 22.5857 18.4891 22.4 18.9445 21.9445L17.8839 20.8839C17.7536 21.0142 17.5561 21.1214 17.0946 21.1835C16.6116 21.2484 15.964 21.25 15 21.25V22.75ZM7 5.75C7.2137 5.75 7.42326 5.76571 7.6277 5.79593L7.84703 4.31205C7.57021 4.27114 7.28734 4.25 7 4.25V5.75ZM12 1.25C9.68949 1.25 7.72942 2.7421 7.02709 4.81312L8.44763 5.29486C8.94981 3.81402 10.3516 2.75 12 2.75V1.25ZM7.02709 4.81312C6.84722 5.34352 6.75 5.91118 6.75 6.5H8.25C8.25 6.07715 8.3197 5.67212 8.44763 5.29486L7.02709 4.81312ZM17 4.25C16.7127 4.25 16.4298 4.27114 16.153 4.31205L16.3723 5.79593C16.5767 5.76571 16.7863 5.75 17 5.75V4.25ZM12 2.75C13.6484 2.75 15.0502 3.81402 15.5524 5.29486L16.9729 4.81312C16.2706 2.7421 14.3105 1.25 12 1.25V2.75ZM15.5524 5.29486C15.6803 5.67212 15.75 6.07715 15.75 6.5H17.25C17.25 5.91118 17.1528 5.34352 16.9729 4.81312L15.5524 5.29486ZM5.75 18V14.584H4.25V18H5.75ZM5.30028 13.8967C3.79769 13.2402 2.75 11.7416 2.75 10H1.25C1.25 12.359 2.6705 14.3846 4.69972 15.2712L5.30028 13.8967ZM18.25 14.584L18.25 18H19.75L19.75 14.584H18.25ZM21.25 10C21.25 11.7416 20.2023 13.2402 18.6997 13.8967L19.3003 15.2712C21.3295 14.3846 22.75 12.359 22.75 10H21.25ZM15.75 6.5V7H17.25V6.5H15.75ZM6.75 6.5V7H8.25V6.5H6.75ZM15 21.25H14V22.75H15V21.25ZM10 21.25H9V22.75H10V21.25Z" fill="#FFF"/>
          <path d="M5 18H13M19 18H17" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
=======
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            width="24" 
            height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6"/>
          </svg>
>>>>>>> f7fa551f6175e39a8f59e891e03d6110422d8e84
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