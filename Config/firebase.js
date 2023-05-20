import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuYbeF4jD1Luxju-uqcH2JYR3lMjtqwWM",
  authDomain: "bonsoinsproject.firebaseapp.com",
  projectId: "bonsoinsproject",
  storageBucket: "bonsoinsproject.appspot.com",
  messagingSenderId: "287146027003",
  appId: "1:287146027003:web:74d811a5969f0759d1cd5e",
  measurementId: "G-F4BJ63C8GJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
