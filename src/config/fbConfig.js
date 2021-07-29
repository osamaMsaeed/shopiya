import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { createFirestoreInstance } from "redux-firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDopTctve5h-rK7cA3PRHm82Na52w4WH_Q",
  authDomain: "shopping-app-b0fe7.firebaseapp.com",
  projectId: "shopping-app-b0fe7",
  storageBucket: "shopping-app-b0fe7.appspot.com",
  messagingSenderId: "1079650635378",
  appId: "1:1079650635378:web:8eeb95ca82118751fafceb",
  measurementId: "G-V7GBY6EF2N",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });
const auth = firebase.auth();
const projectStorage = firebase.storage();
// react redux firebase config

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  createFirestoreInstance, // <- needed if using firestore
};

export { rrfProps, db, auth, projectStorage };
