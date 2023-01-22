// Firebase App (the core Firebase SDK) is always required and must be listed first
// If you enabled Analytics in your project, add the Firebase SDK for Analytics

import {getApp, getApps, initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';
// Required for side-effects
import "firebase/firestore";

// Add the Firebase orders that you want to use
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const initializeFirebase = () => {
  if (!getApps().length) return initializeApp(firebaseConfig)
  else return getApp()
}

const app = initializeFirebase();
const db = getFirestore(app);

// collection references
const movementsCollection = collection(db, "movements")


// export utils/refs
export {
  initializeFirebase,
  db,
  movementsCollection,
};
