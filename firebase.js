// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWbOPekAt9ZWN4LYQqYRJhClM0x6Eq07A",
  authDomain: "inventory-management-e7ad0.firebaseapp.com",
  projectId: "inventory-management-e7ad0",
  storageBucket: "inventory-management-e7ad0.appspot.com",
  messagingSenderId: "808404054569",
  appId: "1:808404054569:web:3b03a6174c6a641607a238",
  measurementId: "G-VY3WWKM7ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const firestore = getFirestore(app)

export {firestore}