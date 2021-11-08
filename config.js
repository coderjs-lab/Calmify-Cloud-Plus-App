import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDt5KM0qIg_CUsXmEwtunMRO6dKsKMZ4DE",
    authDomain: "calmify-smart-glove.firebaseapp.com",
    databaseURL: "https://calmify-smart-glove-default-rtdb.firebaseio.com",
    projectId: "calmify-smart-glove",
    storageBucket: "calmify-smart-glove.appspot.com",
    messagingSenderId: "183357569049",
    appId: "1:183357569049:web:2b52abd61e2bc455765288",
    measurementId: "G-MK3501JTN7"
};

firebase.initializeApp(firebaseConfig);