import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBJZ1ngX91C2ywG4xpoARrqH3B5QSobaxo",
    authDomain: "intania-map.firebaseapp.com",
    projectId: "intania-map",
    storageBucket: "intania-map.appspot.com",
    messagingSenderId: "572210332155",
    appId: "1:572210332155:web:44244431150e8f8e028b5e",
    measurementId: "G-LNBMLN1NK2"
  };




const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);