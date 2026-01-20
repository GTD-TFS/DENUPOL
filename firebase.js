// firebase.js — inicialización única Firebase (cliente)
// Uso directo desde HTML con <script type="module">

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDUG_T31JEWDK9x_apUZVHwriWnjurNrms",
  authDomain: "denupol.firebaseapp.com",
  projectId: "denupol",
  storageBucket: "denupol.firebasestorage.app",
  messagingSenderId: "691472437659",
  appId: "1:691472437659:web:2cdd59082976841d7d513e"
};

// App
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Timestamp seguro servidor
export { serverTimestamp };