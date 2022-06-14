import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isEmpty, isUndefined } from "lodash";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("sdljbnfgkjsdgsdkj", email, password);
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (e) => {
          console.log(e);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", JSON.stringify(e?.user));
          navigate("/admin/dashboard");
        })
        .catch((err) =>
          console.log("catch error in login with email admin", err)
        );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>

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
              // type={true?"password":"text"}
              name="password"
              className="form-control"
              inputMode="password"
              placeholder="Enter password"
              type="password"
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
