import React, { useEffect, useState, } from "react";

import "react-phone-input-2/lib/style.css";
import { useLocation } from "react-router-dom";

import validator from "validator";
import { useNavigate, Link } from "react-router-dom";
import { isEmpty, isUndefined } from "lodash";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDoc } from "firebase/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Alert, } from "react-bootstrap"
import { Button, } from "reactstrap";

import { auth, } from "../../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
// import "./UserLogin.css";

import { Form } from "react-bootstrap";
import { useUserAuth } from "../Context/UserAuthContext"

const UserLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const location = useLocation();

  // const [value, setValue] = useState(false);
  // const { setUpRecaptha } = useUserAuth();

  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [number, setNumber] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(true);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  // const [name, setName] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");

  const [phoneError, setPhoneError] = useState("");


  const login1 = (e) => {
    e.preventDefault();
    // const q = query(collection(db, "userList"), where("isDeleted", "==", true), where("phone", "==", phone), where("email", "==", email));
    // const querySnapshot = await getDocs(q);
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (e) => {
          console.log(e);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", JSON.stringify(e?.user));
          navigate("/user/dashboard");
        })
        .catch((err) => alert("catch error in login", err));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  useEffect(() => {
    const phone = location.search.substring(8)
    console.log("location.search", window.atob(phone));
    phone && setPhone(window.atob(phone))
  }, [])


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
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }

  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };


  // if email and phone number exists


  const login = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "userList"), where("phone", "==", phone), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (e) => {


          console.log(e);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", JSON.stringify(e?.user));
          navigate("/user/dashboard");
        })
        .catch((err) => alert("catch error in login", err));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  useEffect(() => {
    const phone = location.search.substring(8)
    console.log("location.search", window.atob(phone));
    phone && setPhone(window.atob(phone))
  }, [])


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
                // type={"email"}
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
              // onClick={() => logInWithEmailAndPassword(email, password, navigate)}
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

