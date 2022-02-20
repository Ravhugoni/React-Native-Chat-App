// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq-55xynTUW5sbZAWkpUJSg3l_Ngmpe_k",
  authDomain: "lasapp-18063.firebaseapp.com",
  projectId: "lasapp-18063",
  storageBucket: "lasapp-18063.appspot.com",
  messagingSenderId: "838231747110",
  appId: "1:838231747110:web:93467841e647cc3fb054e7"
};

// Initialize Firebase
// const app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

// const auth = firebase.auth()

// export const auth ;
export const app =  initializeApp(firebaseConfig);
export const db = getFirestore(app);