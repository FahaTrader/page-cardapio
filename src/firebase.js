// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Seu Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_G9CX9GFWwnShWP_LZBW1193ag0q_IQg",
  authDomain: "meu-garcom-d4d79.firebaseapp.com",
  projectId: "meu-garcom-d4d79",
  storageBucket: "meu-garcom-d4d79.appspot.com",
  messagingSenderId: "646238709174",
  appId: "1:646238709174:web:3b50e2520c804a6e850d17",
  measurementId: "G-EYVQFRTH3K"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter referências aos serviços que você vai usar
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
