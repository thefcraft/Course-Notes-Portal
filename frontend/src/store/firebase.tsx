// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqng58fWxwRV_Az16yYn5fkbG09rFSP9A",
  authDomain: "college-notes-ae1ea.firebaseapp.com",
  projectId: "college-notes-ae1ea",
  storageBucket: "college-notes-ae1ea.firebasestorage.app",
  messagingSenderId: "843417068531",
  appId: "1:843417068531:web:66e6845ab146563f6fa886",
  measurementId: "G-LTZ5JNYVQW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize Provider & Export
export const microsoftProvider = new OAuthProvider('microsoft.com').setCustomParameters({
    login_hint: 'user_rollno@iitp.ac.in',
    tenant: 'a57f7d92-038e-4d4c-8265-7cd2beb33b34',  // Put Tenant Id from Azure registered app,
    prompt: 'consent' // Get Consent from user to access their basic info (optional - Reommended only during SignUp)
})

