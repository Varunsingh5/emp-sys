





import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { addDoc } from "firebase/firestore";
// import { collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
// import { auth } from "../../firebase";
// import { registerWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, isUndefined } from "lodash";
import { Button, } from "reactstrap";
import { getAuth, updatePassword, } from "firebase/auth";

// import { signInWithEmailAndPassword } from "firebase/auth";
import { query, where, getDocs, collection, addDoc } from "firebase/firestore";



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
  const navigate = useNavigate();

  const [validationState, setValidationState] = useState({

    email: "",
    password: "",
    confirmPassword: "",
  })
  const [phone, setPhone] = useState();
  const [loader, setLoader] = useState(true);

  const updatePswd = () => {
    updatePassword(user, password).then(() => {
      alert("Password has been saved")
      console.log("dfgdfxbjjhh")
      navigate("/user/dashboard");
    }).catch((error) => {
      alert("Password already set")
    });
  }

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

  return (
    <div className="register">
      <div className="register__container">
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