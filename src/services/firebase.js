import firebase from 'firebase';

/* eslint-disable */
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATABASE_URL,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};
/* eslint-enable */

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const ref = path => path ? firebase.database().ref(path) : firebase.database().ref('/');

export default firebase;
