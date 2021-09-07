import firebase from "firebase";

// Firebase Configuration with remote database
const firebaseConfig = {
    apiKey: "AIzaSyCOI8on1pqv3rVnWxNS-86f6ySy_sAHN7E",
    authDomain: "fir-crud-2f121.firebaseapp.com",
    databaseURL: "https://fir-crud-2f121-default-rtdb.firebaseio.com",
    projectId: "fir-crud-2f121",
    storageBucket: "fir-crud-2f121.appspot.com",
    messagingSenderId: "1081401182806",
    appId: "1:1081401182806:web:0f5fea637e129ab0b009f7",
    measurementId: "G-2GZYQ3LDZD"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;