// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,updateDoc, doc,getDoc , deleteDoc} from "firebase/firestore";
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPylZu8e2Lcybx4mf3MY70jMk3ItQ4vqI",
  authDomain: "investcop-11623.firebaseapp.com",
  projectId: "investcop-11623",
  storageBucket: "investcop-11623.appspot.com",
  messagingSenderId: "409761524495",
  appId: "1:409761524495:web:688c62f3df5eb0cbc02c7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const database = getDatabase(app);
const auth = getAuth(app)

// mes collections
const userCollection=collection(db, 'Users');
const projetCollection = collection(db , 'Project');
const adminCollection = collection(db , 'Administrateurs');
const requeteCollection = collection(db , 'requete')

export {db, auth,createUserWithEmailAndPassword,addDoc,signInWithEmailAndPassword,getDocs,updateDoc, doc, getDoc , collection , userCollection ,projetCollection,adminCollection,requeteCollection, deleteDoc , database};