import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCARQA115jjgKq8MFK9h-s8lgztwgrA29g",
  authDomain: "revit-api-test.firebaseapp.com",
  databaseURL: "https://revit-api-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "revit-api-test",
  storageBucket: "revit-api-test.firebasestorage.app",
  messagingSenderId: "117903387594",
  appId: "1:117903387594:web:928f2be5cdc3644d76fd33",
  measurementId: "G-QKW6J1D6LY"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
// };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Use emulator in dev
if (import.meta.env.VITE_USE_EMULATOR === "true" && window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 5173);
}