import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDhNaXJskvZ9YumpRfRNox6iYHHtQrm0WE",
    authDomain: "pizzeria-jedi.firebaseapp.com",
    databaseURL: "https://pizzeria-jedi.firebaseio.com",
    projectId: "pizzeria-jedi",
    storageBucket: "pizzeria-jedi.appspot.com",
    messagingSenderId: "648431701452",
    appId: "1:648431701452:web:2c2bc9d9b20bfc90906169"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, firebase, db, storage, provider}