import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isEmpty, isUndefined } from "lodash"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDoc } from "firebase/firestore";


const AdminLogin = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Test@123456");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("Available");

  const navigate = useNavigate();


  const validateLogin = () => {
    if (!isUndefined(email)) {
      if (isEmpty(email)) {
        setEmailError("Email is a required field");
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        setEmailError("Please enter valid email");
      } else {
        setEmailError("");
      }
    }
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

  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("sdljbnfgkjsdgsdkj", email, password);
      await signInWithEmailAndPassword(auth, email, password)
        .then(async e => {
          console.log(e.user.uid, "role");
          const docRef = doc(db, "userList", e.user.uid,);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().role);
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('user', JSON.stringify(e?.user))
          localStorage.setItem('role', docSnap.data().role);
          console.log(e)
        }).catch(err => alert("no email found", err))

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const user = () => {
    navigate("/")
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <ArrowBackIcon onClick={user} />
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              inputMode="text"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <span className="text-danger">{emailError}</span>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              inputMode="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span className="text-danger">{passwordError}</span>
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                isUndefined(email) ||
                isUndefined(password) ||
                !(isEmpty(emailError) && isEmpty(passwordError))
              }
              onClick={logInWithEmailAndPassword}
              style={{backgroundColor:"black", borderColor:"black"}}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
