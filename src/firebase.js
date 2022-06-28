import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,

} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ8Q2fEIJIM_tFE6KNhBOM_Zxv3K2xwnk",
  authDomain: "assignment1-89cf0.firebaseapp.com",
  projectId: "assignment1-89cf0",
  storageBucket: "assignment1-89cf0.appspot.com",
  messagingSenderId: "12701703518",
  appId: "1:12701703518:web:93cc6139a5eb8ccd4043cf",
  measurementId: "G-CVERWF5FHF"

  // apiKey: "AIzaSyC-or-r3uUfcCQATYemKyzO0_kxc8kkZV0",
  // authDomain: "erp-management-a8e0c.firebaseapp.com",
  // projectId: "erp-management-a8e0c",
  // storageBucket: "erp-management-a8e0c.appspot.com",
  // messagingSenderId: "290875796750",
  // appId: "1:290875796750:web:74c22110f71d2cf81efb5f",
  // measurementId: "G-QGQQ6R6FX4"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebaseDb = getDatabase(app);

const sendPasswordReset = async (email, navigate) => {
  try {
    await sendPasswordResetEmail(auth, email).then(e => {
      alert("Password reset link sent!");
      navigate('/')
    }).catch(err => console.log("rest error", err))

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};




const logout = async (navigate) => {
  // const currentRole = await localStorage.getItem("role");
  localStorage.clear();
  await signOut(auth).then(e => {
    navigate(`/user/login`);
  }).catch(err => console.log("signout error", err))

};
export {
  auth,
  db,
  firebaseDb,

  // authRef,
  // logInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};