import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import config from './env';

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const firestoredb = firebase.firestore(); 

function getUID() {
  return auth.currentUser.uid
}


export { db, auth, firestoredb,getUID, };
