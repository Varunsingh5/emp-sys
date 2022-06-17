import React, { useEffect, useState, } from "react";

import "react-phone-input-2/lib/style.css";
import { useLocation } from "react-router-dom";


const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();



  useEffect(() => {
    const userID = location.search.substring(8)
    console.log("location.search", window.atob(userID));
  }, [])


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
              className="btn btn-primary"  >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
export default SetPassword