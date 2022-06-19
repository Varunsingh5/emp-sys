// // import React, {  useState, } from "react";
// // // useEffect

// // import "react-phone-input-2/lib/style.css";
// // // import { useLocation } from "react-router-dom";
// // import { doc, query,  } from "firebase/firestore";
// // import { collection,} from "firebase/firestore";
// // import { db } from "../../firebase";
// // import { where,updateDoc } from "firebase/firestore";
// // import { getDocs } from "firebase/firestore";
// // import moment from "moment";

// // const SetPassword = () => {
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");


// //   const [name, setName] = useState("");
// //   const [edit, setEdit] = useState(false);
// //   const [phone, setPhone] = useState();
// //   const [email, setEmail] = useState();
// //   const [selectedDoc, setSelectedDoc] = useState("")




// //   // const location = useLocation();



// //   // useEffect(() => {
// //   //   const userID = location.search.substring(8)
// //   //   console.log("location.search", window.atob(userID));
// //   // }, [])




// //         // var CryptoJS = require("crypto-js");
// //         // let data;
// //         // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
// //         // console.log(ciphertext);




// //   const submit = async() => {
// //     // const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email));
// //     // const querySnapshot = await getDocs(q);
// //     // const dd = [];


// //     const q = query(collection(db, "userList"),  where("phone", "==", phone), where("email", "==", email));
// //     const querySnapshot = await getDocs(q);
// //     const dd = [];

// //     querySnapshot.forEach((doc) => {
// //       console.log(doc.id, " => ", doc.data());
// //       dd.push(doc.data());
// //     });
// //     if (doc.exist) {
// //       if (dd.length > 0) {
// //         alert("allready password set")
// //       }
// //       else {

// //         const docRef = doc(db, 'userList', selectedDoc);
// //         var CryptoJS = require("crypto-js");
// //         let data;
// //         var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
// //         console.log(ciphertext);
// //         await updateDoc(docRef, {
// //           name: name,
// //           email: email,
// //           phone: phone,
// //           updated_at: moment.now(),
// //           password:ciphertext
// //         }).then((e) => {
// //           setEmail("");
// //           setPhone("");
// //           setName("");
// //           setEdit(false)
// //         })
// //           .catch((error) =>
// //             console.log("error on doc update user list", error)
// //           );
// //       }
// //     }

// //   }

// //   return (
// //     <div className="auth-wrapper">
// //       <div className="auth-inner">
// //         <form>

// //           <h3>Set New Password</h3>

// //           <div className="mb-3">
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               className="form-control"
// //               inputMode='text'
// //               placeholder="Enter password"
// //               value={password}
// //               onChange={(e) => {
// //                 setPassword(e.target.value)
// //               }}
// //             />

// //           </div>


// //           <div className="mb-3">
// //             <label>Confirm Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               className="form-control"
// //               inputMode='text'
// //               placeholder="Enter confirm password"
// //               value={confirmPassword}
// //               onChange={(e) => {
// //                 setConfirmPassword(e.target.value)
// //               }}
// //             />

// //           </div>


// //           <div className="d-grid">
// //             <button
// //               type='submit'
// //               className="btn btn-primary"  onClick={submit} >
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );

// // }
// // export default SetPassword











// import React, {  useEffect, useState, } from "react";
// import "react-phone-input-2/lib/style.css";
// import { useNavigate } from "react-router-dom";
// // import { useLocation } from "react-router-dom";
// import { doc, query,  } from "firebase/firestore";
// import { collection,} from "firebase/firestore";
// import { db } from "../../firebase";
// import { where,updateDoc } from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import moment from "moment";
// import validator from 'validator';
// import "../../App.css"
// import { Button, } from "reactstrap";

// import { isEmpty, isUndefined } from "lodash"
// import {  useLocation } from "react-router-dom";

// var CryptoJS = require("crypto-js");

// const SetPassword = () => {
//   const [password, setPassword] = useState();
//   const [confirmPassword, setConfirmPassword] = useState("");


//   const [name, setName] = useState("");
//   const [loader, setLoader] = useState(true);
//   const [phone, setPhone] = useState();
//   const [email, setEmail] = useState();
//   const [selectedDoc, setSelectedDoc] = useState("")
//   const [allowPassword, allowSetPassword] = useState(true);
//   const [passsowrdSucess, setPasswordSuccess] = useState(false)

//   const [passwordError, setPasswordError] = useState("");


//   const navigate = useNavigate();

//   const loginuser = () => {
//     navigate("/user/login")
//   }
//   const validateLogin = () => {

//     if (!isUndefined(password)) {
//       if (isEmpty(password)) {
//         setPasswordError("Password is a required field");
//       } else if (
//         !validator.isStrongPassword(password, {
//           minLength: 6,
//           minNumbers: 1,
//           minSymbols: 1,
//         })
//       ) {
//         setPasswordError("Please enter valid Password");
//       } else {
//         setPasswordError("");
//       }
//     }

//   }

//   useEffect(() => {
//     validateLogin();
//   }, [email, password]);


//   const location = useLocation();


// const getDocument = async(decryptedData)=>{
//   console.log("fksfbjjbgj", decryptedData[0].phone);
//   const q = query(collection(db, "userList"), where("email", "==", decryptedData[0].email), where("isDeleted", "==",false));
//     const querySnapshot = await getDocs(q);
//     const dd = [];

//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       dd.push(doc.data());
//     });
//       if (dd.length > 0) {
//         if(!isEmpty(dd[0].password)){
//           allowSetPassword(false)

//         }
//         setLoader(false)
//       }
// }
//   useEffect(() => {
//     const email = location.search.substring(5)
//     var bytes = CryptoJS.AES.decrypt(email, 'df1cbr4ytslujn30aokiqz9mvx6ehw25');
//     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     if(!isEmpty(decryptedData)){
//       setEmail(decryptedData[0].email)
//       setPhone(decryptedData[0].phone)
//       getDocument(decryptedData);
//     }
//   }, [location.search])

//   const submit = async(e) => {
//     e.preventDefault();
//     setLoader(true)
//     const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email),where("isDeleted", "==",false));
//     const querySnapshot = await getDocs(q);
//     const dd = [];

//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       dd.push(doc);
//     });
//       if (dd.length > 0) {
//         const docRef = doc(db, 'userList', dd[0].id);
//         let data=[{password:password}]
//         var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), "df1cbr4ytslujn30aokiqz9mvx6ehw25").toString();
//         console.log(ciphertext);
//         await updateDoc(docRef, {
//           updated_at: moment.now(),
//           password:ciphertext
//         }).then((e) => {
//           allowSetPassword(false)
//           setPasswordSuccess(true)
//           setLoader(false)
//         })
//           .catch((error) =>
//           {  console.log("error on doc update user list", error)
//             setLoader(false)}
//           );
//       }


//   }

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">

// {loader? 
// <div className="spinner-container">
//       <div className="loading-spinner">
//       </div>
//     </div>:



//        allowPassword?<form onSubmit={submit}>

//           <h3>Set New Password</h3>

//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               inputMode='text'
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value)
//               }}
//             />
//                <span className="text-danger">{passwordError}</span>

//           </div>


//           <div className="mb-3">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               inputMode='text'
//               placeholder="Enter confirm password"
//               value={confirmPassword}
//               onChange={(e) => {
//                 setConfirmPassword(e.target.value)
//               }}
//             />

//           </div>


//           <div className="d-grid">
//             <button
//               type='submit'
//               className="btn btn-primary"
//                 // onClick={submit}
//                  >
//               Submit
//             </button>
//           </div>
//         </form>
//       :passsowrdSucess?<span>Password set Successfully</span>  :
//       <div >
//       <span>Password already set please login</span>  

//        <div> 

//        <Button type="submit" className="rounded-pill my-3" color="secondary-blue"
//               style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", padding: " 5px 32px 5px 26px", }}
//               onClick= { loginuser}
//                >
//             login
//             </Button>


//          </div>
//         </div>

//       }
//       </div>
//     </div>
//   );

// }
// export default SetPassword















import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
// import { addDoc } from "firebase/firestore";
// import { collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
// import { auth } from "../../firebase";
// import { registerWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { isEmpty, isUndefined } from "lodash";
import { Button, } from "reactstrap";
import { getAuth, updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword, registerWithEmailAndPassword } from "firebase/auth";

// import { signInWithEmailAndPassword } from "firebase/auth";
import { query, where, getDocs, collection, addDoc } from "firebase/firestore";
// import { where } from "firebase/firestore";
// import { getDocs } from "firebase/firestore";



var CryptoJS = require("crypto-js");

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [name, setName] = useState("");
  // const [loading, error] = useAuthState(auth);
  const [allowPassword, allowSetPassword] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const [validationState, setValidationState] = useState({

    email: "",
    password: "",
    confirmPassword: "",
  })
  const [phone, setPhone] = useState();
  const [loader, setLoader] = useState(true);

  // const generateHash = () => {
  //   const array = new Uint32Array(8)
  //   const arr = window.crypto.getRandomValues(array)
  //   const randomArray = [];
  //   for (let index = 0; index < arr.length; index++) {
  //     randomArray.push(arr[index].toString(36))

  //   }
  //   return randomArray.join("");

  // }


  const updatePswd = () => {

    updatePassword(user, password).then(() => {
      // Update successful.
      console.log("dfgdfxbjjhh")
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }
  // const navigate = useNavigate();


  // const register = () => {

  // };


  // let data;
  // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
  // console.log(ciphertext);

  const location = useLocation();

  const getDocument = async (decryptedData) => {
    console.log("fksfbjjbgj", decryptedData[0].phone);
    const q = query(collection(db, "userList"), where("email", "==", decryptedData[0].email), where("isDeleted", "==", false));
    const querySnapshot = await getDocs(q);
    const dd = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      dd.push(doc.data());
    });
    if (dd.length > 0) {
      if (!isEmpty(dd[0].password)) {
        allowSetPassword(false)

      }
      setLoader(false)
    }
  }
  useEffect(() => {
    const email = location.search.substring(5)
    var bytes = CryptoJS.AES.decrypt(email, 'df1cbr4ytslujn30aokiqz9mvx6ehw25');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!isEmpty(decryptedData)) {
      setEmail(decryptedData[0].email)
      setPhone(decryptedData[0].phone)
      getDocument(decryptedData);
    }
  }, [location.search])




  // const logInWithEmailAndPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("sdljbnfgkjsdgsdkj", email, password);
  //     await signInWithEmailAndPassword(auth, email, password)

  //       .then(async e => {
  //         console.log(e)
  //         localStorage.setItem('isAuth', 'true')
  //         localStorage.setItem('user', JSON.stringify(e?.user))
  //         navigate("/admin/users")
  //       }).catch(err => alert("no email found", err))

  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };


  // const registerWithEmailAndPassword = async (email, password, navigate) => {
  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password).then(async (e) => {
  //       // localStorage.setItem('isAuth', 'true')
  //       // localStorage.setItem('user', JSON.stringify(e?.user))
  //       // const user = e?.user;
  //       await addDoc(collection(db, "userList"), {
  //         uid: user.uid,
  //         email,
  //         onlineState: ""
  //       });
  //       navigate('/admin/users')
  //     }).catch(navigate('/admin/users'))
  //   } catch (err) {
  //     console.error(err);
  //     // alert(err.message);
  //   }
  // };


  // const navigate = useNavigate();

  // const validation = (key, value) => {
  //   let isvalid = false;
  //   let result;
  //   switch (key) {

  //     case 'email':
  //       result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //       isvalid = value ? result.test(value) : false;
  //       break;
  //     case 'password':
  //       result = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
  //       isvalid = value ? result.test(value) : false;
  //       break;

  //     default:
  //       break;
  //   }
  //   console.log("asdgjvaghscdvhas", isvalid);
  //   return isvalid;
  // }
  // const register = () => {

  //   if (!validation('email', email))
  //     setValidationState({ ...validationState, email: "Please enter valid email" })
  //   else {
  //     if (!password)
  //       setValidationState({ ...validationState, password: "Please enter valid passowrd" })
  //     else {
  //       if (!confirmPassword)
  //         setValidationState({ ...validationState, confirmPassword: "Re-enter your password" })
  //       else {
  //         if (password !== confirmPassword)
  //           setValidationState({ ...validationState, confirmPassword: "Password mismatch" })
  //         else {
  //           registerWithEmailAndPassword(email, password, navigate);
  //         }
  //       }
  //     }
  //   }

  //   // // if (!name) alert("Please enter name");
  //   //   if (!validation(email)) alert("email is invalid")
  //   // else if (password != confirmPassword) alert("password mismatched")
  //   // else { registerWithEmailAndPassword(name, email, password, navigate); }
  // };


  return (
    <div className="register">
      <div className="register__container">
        {/* <input type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setValidationState({ ...validationState, name: "" })
          }}
          placeholder="Full Name"
        />
        <span>{validationState?.name}</span> */}
        <input
          type="text"
          className="register__textBox"

          disabled={isDisabled}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setValidationState({ ...validationState, email: "" })
          }}
          placeholder="E-mail Address"
        />
        <span>{validationState?.email}</span>
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setValidationState({ ...validationState, password: "" })
          }}
          placeholder="Password"
        />
        <span>{validationState?.password}</span>
        <input
          type="password"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setValidationState({ ...validationState, confirmPassword: "" })
          }}
          placeholder="Confirm Password"
        />
        <span>{validationState?.confirmPassword}</span>
        {/* <button className="register__btn" >
          Register
        </button> */}



        <Button type="submit" className="rounded-pill my-3" color="secondary-blue" onClick={updatePswd}
          style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", padding: " 5px 32px 5px 26px", }}>
          Register
        </Button>

      </div>
    </div>
  );
}

export default Register;