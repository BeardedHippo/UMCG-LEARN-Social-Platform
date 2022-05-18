// This import loads the firebase namespace.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
  
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCXiOIlit7WAbB8s1ccauVJIyTXBWEqJww",
    authDomain: "learn-demo-6a15f.firebaseapp.com",
    databaseURL: "https://learn-demo-6a15f-default-rtdb.firebaseio.com",
    projectId: "learn-demo-6a15f",
    storageBucket: "learn-demo-6a15f.appspot.com",
    messagingSenderId: "1088412266619",
    appId: "1:1088412266619:web:3e086ce7fa5f6fbffbb2de"
}

const firebaseApp = firebase.initializeApp(config)
const database = firebaseApp.database()
const auth = firebaseApp.auth()

export {database, auth}