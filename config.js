import* as firebase from 'firebase';
require('@firebase/firestore')
 var firebaseConfig = {
    apiKey: "AIzaSyCR6B5YGTpwBKyurICsIkV6WsyM2Oz15hk",
    authDomain: "bedtime-stories-7c45a.firebaseapp.com",
    projectId: "bedtime-stories-7c45a",
     databaseURL: "https://bedtime-stories-7c45a.firebaseio.com",
    storageBucket: "bedtime-stories-7c45a.appspot.com",
    messagingSenderId: "54041210041",
    appId: "1:54041210041:web:2318007feaa2a409f07f68",
    measurementId: "G-LE92MW42T4"
  };
  // Initialize Firebase
  if (firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

  export default firebase.firestore();
  


 