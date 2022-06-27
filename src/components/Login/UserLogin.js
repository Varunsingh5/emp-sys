import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import validator from "validator";
import { isEmpty, isUndefined } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { auth, } from "../../firebase";
<
import { query, collection, where, getDocs, } from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";


import {
  linkWithPhoneNumber,
  RecaptchaVerifier,

  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  // signInWithPhoneNumber,
} from "firebase/auth";
import "./UserLogin.css";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const UserLogin = () => {
  const [value, setValue] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [number, setNumber] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(true);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [user, setUser] = useState(null)
  const login = async (e) => {
    e.preventDefault();
    try {

      console.log(password);
      console.log(email);
      const q = query(collection(db, "userList"), where("email", "==", email), where("isDeleted", "==", false));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      signInWithEmailAndPassword(auth, email, password)
        .then(async (e) => {
          console.log(e);
          const docRef = doc(db, "userList", e.user.uid);
          const docSnap = await getDoc(docRef);
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('user', JSON.stringify(e?.user))
          localStorage.setItem('role', docSnap.data().role);
          console.log("dfgdfgd", docSnap.data())
          navigate("/user/dashboard");
        })
        .catch((err) => alert("user not found", err));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  // Validations
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
  };
  useEffect(() => {
    validateLogin();
  }, [email, password]);
  // phone number validation
  const validatePhone = () => {
    if (!isUndefined(phone)) {
      if (isEmpty(phone)) {
        setPhoneError("Phone number is a required field")
      }
      else {
        setPhoneError("")
      }
    }
  };
  useEffect(() => {
    validatePhone();
  }, [phone]);
  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      console.log(number);

      // const recaptchaVerifier = new RecaptchaVerifier(
      //   "recaptcha-container",
      //   {},
      //   auth
      // );
      // recaptchaVerifier.render();
      // const response = await signInWithPhoneNumber(auth, number, recaptchaVerifier);
      // setResult(response);
      // setFlag(true);

      const q = query(collection(db, "userList"), where("phone", "==", number), where("isDeleted", "==", false));
      const querySnapshot = await getDocs(q);
      let test;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data(), "phone", "==", number);
        test = doc.data();
      });
      console.log(test.phone);
      if (test.phone === number) {
        console.log('matched');
        const recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        recaptchaVerifier.render();
        // const uid = " currentUser.id"
       
        // const response = await linkWithPhoneNumber(uid, number, recaptchaVerifier)
        const response = await signInWithPhoneNumber(auth, number, recaptchaVerifier);
        // const response = await setUpRecaptha(number);
        setResult(response);
        setFlag(true);
      }
      else {
        console.log('not');
      }

    } catch (err) {
      // alert("no. not register")
      setError(err.message);
      return setError("Please enter a valid phone number!");
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("role", "user");
    } catch (err) {
      setError(err.message);
    }
  };

  const handle = () => {
    signInWithEmailAndPassword(auth,)
  };


  if (phoneLogin) {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={login} name="login_form">
            <h3>User Login</h3>
            {error && <div className="auth__error">{error}</div>}
            <div className="mb-3">
              <label>Email address</label>
              <input
                name="email"
                inputMode="text"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="text-danger">{emailError}</span>
            </div>
            <div className="mb-3">
              <label>Password</label>

              <input
                name="password"
                className="form-control"
                inputMode="password"
                type="password"
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

                style={{backgroundColor:"black", borderColor:"black"}}

                onClick={handle}

              >
                Login
              </button>
              <br />
              <p
                style={{ textAlign: "center" }}
                onClick={() => setPhoneLogin(false)}
              >
                Login with phone number
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
  else {
    return (
      <>
        <div className="p-4 box">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
              />
              <div id="recaptcha-container"></div>
            </Form.Group>
            <div className="button-right">
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              &nbsp;
              <Button type="submit" variant="primary">
                Send Otp
              </Button>
            </div>
            <br />
            <p
              style={{ textAlign: "center" }}
              onClick={() => setPhoneLogin(true)}
            >
              Login with Email and Password
            </p>
          </Form>
          <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Control
                type="otp"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className="button-right">
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              &nbsp;
              <Button type="submit" variant="primary">
                Verify
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
  }
};
export default UserLogin;