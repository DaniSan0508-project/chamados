import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDI_dwCs1c_fX3Y1dcj9YHKVYBuPWUkXFM",
    authDomain: "sistema-bba23.firebaseapp.com",
    projectId: "sistema-bba23",
    storageBucket: "sistema-bba23.appspot.com",
    messagingSenderId: "250464885385",
    appId: "1:250464885385:web:3b65ae4a2b75748f6fc458",
    measurementId: "G-00N36HVB3E"
  };

  if(!firebase.apps.length){
      // Initialize Firebase
     firebase.initializeApp(firebaseConfig)
  }

  export default firebase;