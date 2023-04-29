// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDu3zxXxOXPkruXgt1F2HCa4fzIsqRd10Q",
    authDomain: "test-77557.firebaseapp.com",
    projectId: "test-77557",
    storageBucket: "test-77557.appspot.com",
    messagingSenderId: "1057662200631",
    appId: "1:1057662200631:web:39b1e51dc0a082117f88b2",
    measurementId: "G-P58T3HTWL9"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const storage = firebase.storage();
  
  export { storage, firebase as default };