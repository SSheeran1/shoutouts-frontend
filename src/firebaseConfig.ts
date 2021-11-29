import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAS5gL9fd7wUxbmaixeNKjpDI0aPfHAceo",
  authDomain: "shoutouts-8275d.firebaseapp.com",
  projectId: "shoutouts-8275d",
  storageBucket: "shoutouts-8275d.appspot.com",
  messagingSenderId: "641513543352",
  appId: "1:641513543352:web:10d8bc495e893495e1064d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
export const storage = getStorage(app);
