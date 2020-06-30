import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDOhIyj-oHAJZ3jsGFnp9M9CDAKNL6UkVU",
  authDomain: "todolist-191ad.firebaseapp.com",
  databaseURL: "https://todolist-191ad.firebaseio.com",
  projectId: "todolist-191ad",
  storageBucket: "todolist-191ad.appspot.com",
  messagingSenderId: "637099047018",
  appId: "1:637099047018:web:1436a4a1ee26e0da77b213"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
