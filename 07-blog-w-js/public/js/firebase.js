// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js';
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBF1oTZxaN1PP8xSyKeGizISuE-Hh0fOh0',

  authDomain: 'blog-t-w-js.firebaseapp.com',

  projectId: 'blog-t-w-js',

  storageBucket: 'blog-t-w-js.appspot.com',

  messagingSenderId: '493259016165',

  appId: '1:493259016165:web:08b3782fc6e146609a510c',
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
