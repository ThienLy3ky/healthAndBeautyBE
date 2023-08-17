import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQAvk-INHTMUrBrkMsns6ExvLH7u2JqKs",
  authDomain: "hbshops-34e0a.firebaseapp.com",
  projectId: "hbshops-34e0a",
  storageBucket: "hbshops-34e0a.appspot.com",
  messagingSenderId: "578593293857",
  appId: "1:578593293857:web:e9e21357b2715b86e28560",
  measurementId: "G-583CEG42GV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
