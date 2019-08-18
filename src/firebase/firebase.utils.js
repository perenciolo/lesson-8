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

/**
 * Helper to populate firebase database.
 *
 * @param {string} collectionKey collection key string.
 * @param {object} objectsToAdd objects to add to firebase collection.
 */
export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

/**
 *
 * @param {object} collections
 */
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  /**
   * Converts collection from array to a hash table
   * transforming indexes in hashes title based.
   */
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
