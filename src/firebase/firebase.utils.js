import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBDzUS96CaH0XI4JPXgfrX3mBBmp9WNdqU',
  authDomain: 'crwn-clothing-2ddfd.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-2ddfd.firebaseio.com',
  projectId: 'crwn-clothing-2ddfd',
  storageBucket: '',
  messagingSenderId: '86612050149',
  appId: '1:86612050149:web:e1e801a78f1a5971'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  // Store user if no exists on DB.
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
