import * as firebase from 'firebase';
import Platform from 'react-native';

const iosConfig = {
    apiKey: "AIzaSyDE-9W12GKiMw36c04UFQHHM2CBCfGLaOo",
    authDomain: "coronatest-4ff2c.firebaseapp.com",
    databaseURL: "https://coronaselftest.firebaseio.com",
    projectId: "coronaselftest",
    storageBucket: "coronaselftest.appspot.com",
    messagingSenderId: "93769817084",
    appId: "1:93769817084:ios:a5eb5d4bf899ad96daf079"
};

const androidConfig = {
    apiKey: "AIzaSyCFtRqA-IpKvx5plGploYSyqUPyi9ZE7ng",
    authDomain: "coronaselftest.firebaseapp.com",
    databaseURL: "https://coronaselftest.firebaseio.com",
    projectId: "coronaselftest",
    storageBucket: "coronaselftest.appspot.com",
    messagingSenderId: "93769817084",
    appId: "1:93769817084:android:0038bb5385ba79bedaf079"
};

const firebaseApp = firebase.initializeApp((Platform.OS === 'ios') ? iosConfig : androidConfig);
// const firebaseStorage = firebase.storage();
const database = firebaseApp.database();
// const firestoreDB = firebaseApp.firestore();

export default {
    firebaseApp,
    database
};