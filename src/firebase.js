import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcpR40Nuc0b98LO2m4jWXBAckcVhokTG0",
  authDomain: "authweb5-d8133.firebaseapp.com",
  projectId: "authweb5-d8133",
  storageBucket: "authweb5-d8133.firebasestorage.app",
  messagingSenderId: "484060852804",
  appId: "1:484060852804:web:b118e3bb3df7fb8c0bc211"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();