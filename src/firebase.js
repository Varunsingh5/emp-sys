import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-or-r3uUfcCQATYemKyzO0_kxc8kkZV0",
  authDomain: "erp-management-a8e0c.firebaseapp.com",
  projectId: "erp-management-a8e0c",
  storageBucket: "erp-management-a8e0c.appspot.com",
  messagingSenderId: "290875796750",
  appId: "1:290875796750:web:74c22110f71d2cf81efb5f",
  measurementId: "G-QGQQ6R6FX4"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebaseDb = getDatabase(app);
// const authRef = firebase.auth();


// const logInWithEmailAndPassword = async (email, password, navigate) => {

//   try {
//     await signInWithEmailAndPassword(auth, email, password).then(async e => {
//       localStorage.setItem('isAuth', 'true')
//       localStorage.setItem('user', JSON.stringify(e?.user))

//       const docRef = doc(db, "users", e.user.uid);
//       const docSnap = await getDoc(docRef);


//       if (docSnap.exists()) {

//         console.log("Document data:", docSnap.data());
//         localStorage.setItem('role',docSnap.data().role);
//         if(docSnap.data().role === "admin"){

//         navigate("/user")
//         }
//         else{
//           navigate("/user/login")
//         }
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }

//       // const q = query(collection(db, "users"), where("role=admin", "===",true ));
//       // const querySnapshot = await getDocs(q);
//       // querySnapshot.forEach((doc) => {
//       //   // doc.data() is never undefined for query doc snapshots
//       //   console.log(doc.id, " => ", doc.data());
//       // });



//     }).catch(err => alert(err.message))
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

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



// const registerWithEmailAndPassword = async ( email, password, navigate) => {
//   try {
//     // const q = query(collection(db, "userList"), where("isDeleted", "==", true), where("email", "==", email));
//     // const querySnapshot = await getDocs(q);
//     // const dd = [];
//     const res = await createUserWithEmailAndPassword(auth, email, password).then(async (e) => {
//       // localStorage.setItem('isAuth', 'true')
//       // localStorage.setItem('user', JSON.stringify(e?.user))
//       // const user = e?.user;
//       await addDoc(collection(db, "users"), {
//         // uid: user.uid,
//         // name,
//         // authProvider: "local",
//         email,
//         // onlineState: ""
//       });
//       navigate('/admin/users')
//     }).catch(err => alert(err.message))
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = async (navigate) => {
//   const currentRole = await localStorage.getItem("role");
//   localStorage.clear();
//   await signOut(auth).then(e => {

//   }).catch(err => console.log("signout error", err))

// };



const logout = async (navigate) => {
  // const currentRole = await localStorage.getItem("role");
  localStorage.clear();
  await signOut(auth).then(e => {
    navigate(`/admin/login`);
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