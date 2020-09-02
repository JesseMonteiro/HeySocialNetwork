import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjFCbOGSTXc8M-AJIzHKY-hlNCzjjl8xo",
  authDomain: "heysocialnetwork.firebaseapp.com",
  databaseURL: "https://heysocialnetwork.firebaseio.com",
  projectId: "heysocialnetwork",
  storageBucket: "heysocialnetwork.appspot.com",
  messagingSenderId: "777545565227",
  appId: "1:777545565227:web:e221103d2b351988e5166e",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore

export default function setFirebase(Vue){
    Object.defineProperty( Vue.prototype, '$firebase', {
        get(){
            return firebaseApp
        }
    })

}