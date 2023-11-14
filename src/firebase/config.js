import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChCXYJ1SjIOl7v8kveKhr1HDHcIhGkYgQ",
    authDomain: "trilhaecoutf-1e73d.firebaseapp.com",
    projectId: "trilhaecoutf-1e73d",
    storageBucket: "trilhaecoutf-1e73d.appspot.com",
    messagingSenderId: "103834267269",
    appId: "1:103834267269:web:60f8ee13a6abb1c1e803ec",
    measurementId: "G-SPSERDZBRT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };