// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtoioCQ0yAljfr13KTXst4ukF0EkgdGDc",
  authDomain: "mytwitterapp-44cf1.firebaseapp.com",
  projectId: "mytwitterapp-44cf1",
  storageBucket: "mytwitterapp-44cf1.appspot.com",
  messagingSenderId: "655765880430",
  appId: "1:655765880430:web:8404c593b882620916b07f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}