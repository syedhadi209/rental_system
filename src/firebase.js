import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrG2Djd1TqsQViqReE9CldZUCe7wfdt5M",
  authDomain: "rental-system-9a02f.firebaseapp.com",
  projectId: "rental-system-9a02f",
  storageBucket: "rental-system-9a02f.appspot.com",
  messagingSenderId: "272264916753",
  appId: "1:272264916753:web:902d808b9037a6e68ca6b0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { app, auth, db };
