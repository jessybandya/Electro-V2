import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArIAi7mgANUpDx6DzxYwMV1_1eAbYdFuk",
    authDomain: "electro-app-1.firebaseapp.com",
    projectId: "electro-app-1",
    storageBucket: "electro-app-1.appspot.com",
    messagingSenderId: "384975368602",
    appId: "1:384975368602:web:894c5b9ec1765eb63b4a23",
    measurementId: "G-TZ4WMDHS56"
  };

const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 const TwitterProvider = new firebase.auth.TwitterAuthProvider();
 const GithubProvider = new firebase.auth.GithubAuthProvider();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
export  {auth};
export  {storage};