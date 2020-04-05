import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBkq-e_bV_GiNYIBmB6D4rjtOzB1n0x6Js',
	authDomain: 'places-cfdaa.firebaseapp.com',
	databaseURL: 'https://places-cfdaa.firebaseio.com',
	projectId: 'places-cfdaa',
	storageBucket: 'places-cfdaa.appspot.com',
	messagingSenderId: '700497889963',
	appId: '1:700497889963:web:a2118a202f88d1c21a85ee',
	measurementId: 'G-HRT5LGVDWH'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
