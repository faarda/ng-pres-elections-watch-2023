// const firebase = require("firebase/app");
// require("firebase/firestore");
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// import firestore from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyCwBFMtW4LMroizIkVWQElf939rMFbYDCc",
//   authDomain: "catlog-coming-soon.firebaseapp.com",
//   projectId: "catlog-coming-soon",
//   appId: "1:1060267592743:web:eb234b9d8b772014289202",
//   measurementId: "G-QHB2NMD8FT",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAGXYTXuXdP0z5NzLXHlcn2w4CcL6-PyK0",
  authDomain: "elections-watch-4bb2d.firebaseapp.com",
  projectId: "elections-watch-4bb2d",
  storageBucket: "elections-watch-4bb2d.appspot.com",
  messagingSenderId: "352164622202",
  appId: "1:352164622202:web:46ab67e2ab45867bed70c3",
};

const apps = getApps();
let app = apps[0];

// Initialize Firebase
if (apps?.length === 0) {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);

export default db;
