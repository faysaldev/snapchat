import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRcbcjRKEPGJTyhlwM3gZbjYYoDEZX-bo",
  authDomain: "snapchat-clone-64bcf.firebaseapp.com",
  projectId: "snapchat-clone-64bcf",
  storageBucket: "snapchat-clone-64bcf.appspot.com",
  messagingSenderId: "836065492058",
  appId: "1:836065492058:web:db2cf610ca87f41b0aac63",
  measurementId: "G-BNNKEYCQCB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };