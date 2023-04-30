import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


// TODO: Replace the following with your app's Firebase project configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu3zxXxOXPkruXgt1F2HCa4fzIsqRd10Q",
  authDomain: "test-77557.firebaseapp.com",
  projectId: "test-77557",
  storageBucket: "test-77557.appspot.com",
  messagingSenderId: "1057662200631",
  appId: "1:1057662200631:web:39b1e51dc0a082117f88b2",
  measurementId: "G-P58T3HTWL9"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;