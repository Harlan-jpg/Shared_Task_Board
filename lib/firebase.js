import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// these come from the env local file

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

};

// makes sure firebase only starts ONCE even if the page reloads or hot reloads because next js runs the code twice in dev mode. getApps() returns an array of all the apps that have been started. if it's empty start one otherwise use the first one.

let app;

if (getApps().length === 0) {

  app = initializeApp(firebaseConfig);
  
} else {

  app = getApps()[0];

}

export const auth = getAuth(app);   
export const db = getFirestore(app);
