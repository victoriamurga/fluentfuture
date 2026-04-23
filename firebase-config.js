// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBWkRIrQWbj3Qg5_shlLmSBq-bKG804bIs',
  authDomain: 'fluent-future-project.firebaseapp.com',
  projectId: 'fluent-future-project',
  storageBucket: 'fluent-future-project.firebasestorage.app',
  messagingSenderId: '541675444332',
  appId: '1:541675444332:web:de356df467d07532302049',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
