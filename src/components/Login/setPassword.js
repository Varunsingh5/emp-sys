import React, {  useState, } from "react";
// useEffect

import "react-phone-input-2/lib/style.css";
// import { useLocation } from "react-router-dom";
import { doc, query,  } from "firebase/firestore";
import { collection,} from "firebase/firestore";
import { db } from "../../firebase";
import { where,updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import moment from "moment";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [selectedDoc, setSelectedDoc] = useState("")


  

  // const location = useLocation();



  // useEffect(() => {
  //   const userID = location.search.substring(8)
  //   console.log("location.search", window.atob(userID));
  // }, [])




        // var CryptoJS = require("crypto-js");
        // let data;
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        // console.log(ciphertext);




  const submit = async() => {
    // const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email));
    // const querySnapshot = await getDocs(q);
    // const dd = [];


    const q = query(collection(db, "userList"),  where("phone", "==", phone), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const dd = [];
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      dd.push(doc.data());
    });
    if (doc.exist) {
      if (dd.length > 0) {
        alert("allready password set")
      }
      else {
       
        const docRef = doc(db, 'userList', selectedDoc);
        var CryptoJS = require("crypto-js");
        let data;
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        console.log(ciphertext);
        await updateDoc(docRef, {
          name: name,
          email: email,
          phone: phone,
          updated_at: moment.now(),
          password:ciphertext
        }).then((e) => {
          setEmail("");
          setPhone("");
          setName("");
          setEdit(false)
        })
          .catch((error) =>
            console.log("error on doc update user list", error)
          );
      }
    }

  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>

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
              className="btn btn-primary"  onClick={submit} >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
export default SetPassword