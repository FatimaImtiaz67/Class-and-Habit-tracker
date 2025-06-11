// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCYC6cMVmCegkXYUW2RJoIbD91vGyAiV1s",
  authDomain: "rhythmix-27b7a.firebaseapp.com",
  databaseURL: "https://rhythmix-27b7a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rhythmix-27b7a",
  storageBucket: "rhythmix-27b7a.firebasestorage.app",
  messagingSenderId: "76096707349",
  appId: "1:76096707349:web:5297685dd47d304b37671c",
  measurementId: "G-59059ZJ9SH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
