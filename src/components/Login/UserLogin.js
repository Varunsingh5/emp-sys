import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { isEmpty, isUndefined } from "lodash";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  // FormText,
  // Input,
} from "reactstrap";
import { FormControl, Alert } from "react-bootstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import {useUserAuth} from "../Context/UserAuthContext"

  const UserLogin = () => {
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [number, setNumber] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  // const { setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");
  

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

  //OTP validation
  // const getOtp = async (e) => {
  //   e.preventDefault();
  //   console.log(number);
  //   setError("");
  //   if (number === "" || number === undefined)
  //     return setError("Please enter a valid phone number!");
  //   try {
  //     const response = await setUpRecaptha(number);
  //     setResult(response);
  //     setFlag(true);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const verifyOtp = async (e) => {
    // e.preventDefault();
    // setError("Please enter a valid otp!");
    // if (otp === "" || otp === null) return;
    // try {
    //   console.log("result", result);
    //   await result
    //     .confirm(otp)
    //     .then(async (confirmationResult) => {
    //       console.log("jdvfsdnhfjdshi", confirmationResult);
    //       localStorage.setItem("isAuth", "true");
    //       localStorage.setItem(
    //         "user",
    //         JSON.stringify(confirmationResult?.user)
    //       );
    //       localStorage.setItem("role", "user");
    //       console.log("SSzfasfas", confirmationResult?.user);

    //       const docRef = doc(db, "users", confirmationResult?.user?.uid);
    //       const docSnap = await getDoc(docRef);
    //       if (docSnap.exists()) {
    //         localStorage.setItem("role", docSnap.data().role);
    //         // if (docSnap.data().role == "user") {
    //         // history.push("/user");
    //         // }
    //       } else {
    //         await setDoc(docRef, {
    //           uid: confirmationResult?.user?.uid,
    //           name: "",
    //           authProvider: confirmationResult?.providerId,
    //           email: "",
    //           onlineState: "",
    //           role: "user",
    //           isVerified: false,
    //           created_at: moment.now(),
    //         })
    //           .then((e) => {
    //             // history.push("/user");
    //           })
    //           .catch((error) =>
    //             console.log("error on doc create phone signup", error)
    //           );
    //       }
    //     })
    //     .catch(async (err) => {
    //       console.log("error in confirm otp", err);
    //     });
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  // const fetchUserName = async (user) => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //     return { user };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (phoneLogin) {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>User Login</h3>

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
              >
                Submit
              </button>
              <p onClick={() => setPhoneLogin(false)}>
                Login with phone number
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div><form>
      <PhoneInput
        defaultCountry="IN"
        value={number}
        onChange={setNumber}
        placeholder="Enter Phone Number"
        style={{ marginLeft: "38%" }}
      />
      
      
      <div className="button-right">
        {/* <Link to="/"> */}
        <button
          variant="secondary"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <span>Cancel</span>
        </button>
        {/* </Link> */}
        &nbsp;
        <button
          type="Submit"
          variant="primary"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <span>Sent OTP</span>
        </button>
      </div>
      <br/>
      <p onClick={() => setPhoneLogin(true)}>Login with email and password</p>
      {/* <div id="recaptcha-container"></div> */}
      </form></div>
    )
  }
};

export default UserLogin;
