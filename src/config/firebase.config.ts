import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDd7X6wzM9k93zvcSuyO0EvwWhRyN18sZM",
  authDomain: "ajudai-ii.firebaseapp.com",
  projectId: "ajudai-ii",
  storageBucket: "ajudai-ii.appspot.com",
  messagingSenderId: "751218601655",
  appId: "1:751218601655:web:04b4397924808c640fa732",
  measurementId: "G-4BPBRZPDDG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);