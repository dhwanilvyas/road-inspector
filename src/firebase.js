import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA4xnYOyNcsLJTpIvadgK3XSvgbTsOL5BE",
  authDomain: "roadinspector-22c9a.firebaseapp.com",
  databaseURL: "https://roadinspector-22c9a.firebaseio.com",
  projectId: "roadinspector-22c9a",
  storageBucket: "roadinspector-22c9a.appspot.com",
  messagingSenderId: "177599961093"
};

firebase.initializeApp(config);

let db = firebase.database();

export default db;
