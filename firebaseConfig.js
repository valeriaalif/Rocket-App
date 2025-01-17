// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwH0i4i2KyqKGSTp6uA8-RuvhGg4FgQy8",
    authDomain: "rocketapp-a37d9.firebaseapp.com",
    projectId: "rocketapp-a37d9",
    storageBucket: "rocketapp-a37d9.firebasestorage.app",
    messagingSenderId: "1016278576967",
    appId: "1:1016278576967:web:d9c8609952d4b0cc2e6662",
    measurementId: "G-MHCXWXVB06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Auth instance
const auth = getAuth(app);

export { auth, sendPasswordResetEmail };


