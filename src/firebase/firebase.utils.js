import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBcqt96wVD3lHAS0585Pwc3oIEbjdDRI_8",
  authDomain: "fashionstore-2f205.firebaseapp.com",
  databaseURL: "https://fashionstore-2f205.firebaseio.com",
  projectId: "fashionstore-2f205",
  storageBucket: "fashionstore-2f205.appspot.com",
  messagingSenderId: "1030690950886",
  appId: "1:1030690950886:web:6ffe4ba682117d49e63527"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
