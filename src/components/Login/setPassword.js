// import React, {  useState, } from "react";
// // useEffect

// import "react-phone-input-2/lib/style.css";
// // import { useLocation } from "react-router-dom";
// import { doc, query,  } from "firebase/firestore";
// import { collection,} from "firebase/firestore";
// import { db } from "../../firebase";
// import { where,updateDoc } from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import moment from "moment";

// const SetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");


//   const [name, setName] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [phone, setPhone] = useState();
//   const [email, setEmail] = useState();
//   const [selectedDoc, setSelectedDoc] = useState("")


  

//   // const location = useLocation();



//   // useEffect(() => {
//   //   const userID = location.search.substring(8)
//   //   console.log("location.search", window.atob(userID));
//   // }, [])




//         // var CryptoJS = require("crypto-js");
//         // let data;
//         // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
//         // console.log(ciphertext);




//   const submit = async() => {
//     // const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email));
//     // const querySnapshot = await getDocs(q);
//     // const dd = [];


//     const q = query(collection(db, "userList"),  where("phone", "==", phone), where("email", "==", email));
//     const querySnapshot = await getDocs(q);
//     const dd = [];
    
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       dd.push(doc.data());
//     });
//     if (doc.exist) {
//       if (dd.length > 0) {
//         alert("allready password set")
//       }
//       else {
       
//         const docRef = doc(db, 'userList', selectedDoc);
//         var CryptoJS = require("crypto-js");
//         let data;
//         var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
//         console.log(ciphertext);
//         await updateDoc(docRef, {
//           name: name,
//           email: email,
//           phone: phone,
//           updated_at: moment.now(),
//           password:ciphertext
//         }).then((e) => {
//           setEmail("");
//           setPhone("");
//           setName("");
//           setEdit(false)
//         })
//           .catch((error) =>
//             console.log("error on doc update user list", error)
//           );
//       }
//     }

//   }

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <form>

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
//               className="btn btn-primary"  onClick={submit} >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

// }
// export default SetPassword











import React, {  useEffect, useState, } from "react";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { doc, query,  } from "firebase/firestore";
import { collection,} from "firebase/firestore";
import { db } from "../../firebase";
import { where,updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import moment from "moment";
import validator from 'validator';
import "../../App.css"
import { Button, } from "reactstrap";

import { isEmpty, isUndefined } from "lodash"
import {  useLocation } from "react-router-dom";

var CryptoJS = require("crypto-js");

const SetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");


  const [name, setName] = useState("");
  const [loader, setLoader] = useState(true);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [selectedDoc, setSelectedDoc] = useState("")
  const [allowPassword, allowSetPassword] = useState(true);
  const [passsowrdSucess, setPasswordSuccess] = useState(false)
  
  const [passwordError, setPasswordError] = useState("");


  const navigate = useNavigate();

  const loginuser = () => {
    navigate("/user/login")
  }
  const validateLogin = () => {
    
    if (!isUndefined(password)) {
      if (isEmpty(password)) {
        setPasswordError("Password is a required field");
      } else if (
        !validator.isStrongPassword(password, {
          minLength: 6,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setPasswordError("Please enter valid Password");
      } else {
        setPasswordError("");
      }
    }

  }

  useEffect(() => {
    validateLogin();
  }, [email, password]);


  const location = useLocation();


const getDocument = async(decryptedData)=>{
  console.log("fksfbjjbgj", decryptedData[0].phone);
  const q = query(collection(db, "userList"), where("email", "==", decryptedData[0].email), where("isDeleted", "==",false));
    const querySnapshot = await getDocs(q);
    const dd = [];
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      dd.push(doc.data());
    });
      if (dd.length > 0) {
        if(!isEmpty(dd[0].password)){
          allowSetPassword(false)
          
        }
        setLoader(false)
      }
}
  useEffect(() => {
    const email = location.search.substring(5)
    var bytes = CryptoJS.AES.decrypt(email, 'df1cbr4ytslujn30aokiqz9mvx6ehw25');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if(!isEmpty(decryptedData)){
      setEmail(decryptedData[0].email)
      setPhone(decryptedData[0].phone)
      getDocument(decryptedData);
    }
  }, [location.search])

  const submit = async(e) => {
    e.preventDefault();
    setLoader(true)
    const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email),where("isDeleted", "==",false));
    const querySnapshot = await getDocs(q);
    const dd = [];
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      dd.push(doc);
    });
      if (dd.length > 0) {
        const docRef = doc(db, 'userList', dd[0].id);
        let data=[{password:password}]
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), "df1cbr4ytslujn30aokiqz9mvx6ehw25").toString();
        console.log(ciphertext);
        await updateDoc(docRef, {
          updated_at: moment.now(),
          password:ciphertext
        }).then((e) => {
          allowSetPassword(false)
          setPasswordSuccess(true)
          setLoader(false)
        })
          .catch((error) =>
          {  console.log("error on doc update user list", error)
            setLoader(false)}
          );
      }
    

  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">

{loader? 
<div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>:



       allowPassword?<form onSubmit={submit}>

          <h3>Set New Password</h3>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              inputMode='text'
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
               <span className="text-danger">{passwordError}</span>

          </div>


          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              inputMode='text'
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />

          </div>


          <div className="d-grid">
            <button
              type='submit'
              className="btn btn-primary"
                // onClick={submit}
                 >
              Submit
            </button>
          </div>
        </form>
      :passsowrdSucess?<span>Password set Successfully</span>  :
      <div >
      <span>Password already set please login</span>  
      
       <div> 

       <Button type="submit" className="rounded-pill my-3" color="secondary-blue"
              style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", padding: " 5px 32px 5px 26px", }}
              onClick= { loginuser}
               >
            login
            </Button>


         </div>
        </div>
      
      }
      </div>
    </div>
  );

}
export default SetPassword