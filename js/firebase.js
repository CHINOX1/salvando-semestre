import { firebaseConfig } from "./credenciales.js";
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);