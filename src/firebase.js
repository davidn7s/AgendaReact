import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvu75VQOGE8nPJ8w6JdTMd8GY5Lnv8-Xg",
  authDomain: "examenfirebase1.firebaseapp.com",
  projectId: "examenfirebase1",
  storageBucket: "examenfirebase1.appspot.com",
  messagingSenderId: "706675197586",
  appId: "1:706675197586:web:387b69fb8e78596bfe884b",
  measurementId: "G-ST42EX8N85"

};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database }