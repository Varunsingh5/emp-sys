import React, {  useState, useEffect } from 'react'
import validator from 'validator';
import PhoneInput from "react-phone-number-input";

const UserLogin = () => {


    const [phoneLogin, setPhoneLogin] = useState(true);
  const [email, setEmail] = useState();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateLogin = () => {
    
    if(email !== undefined ){
      if (email === '') {
        setEmailError("Email is a required field" )
        setDisableButton(true);
      }
      else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
        setEmailError("Please enter valid email" )
        setDisableButton(true);
      }else {
        setEmailError("" )
          setDisableButton(false);
      }
    }

    if(password !== undefined ){
      if (password === '') {
        setPasswordError("Password is a required field")
        setDisableButton(true);
      }
      else if (!validator.isStrongPassword(password, {
        minLength: 6, 
        minNumbers:1,
        minSymbols:1
      })) { 
        setPasswordError("Please enter valid Password")
        setDisableButton(true);
      }else {
        setPasswordError("")
          setDisableButton(false);
      }
    }
  }

  useEffect(() => {
    validateLogin();
  }, [email, password]);

 

  if (phoneLogin) { 

    return (
        <form>
          <h3>Sign In</h3>
  
          <div className="mb-3">
            <label>Email address</label>
            {console.log("lbhvjjhvjhjhyvg",email,password)}
            <input
            // type={"email"}
            name="email"
            inputMode='text'
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
  
              }}
            />
            <span className = "text-danger">{emailError}</span>
          </div>
  
          <div className="mb-3">
            <label>Password</label>
            <input
              // type={true?"password":"text"}
              name="password"
              className="form-control"
              inputMode='password'
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <span  className = "text-danger">{passwordError}</span>
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
            <button className="btn btn-primary" disabled = {false} >
              Submit
            </button>

            <p  onClick={() => setPhoneLogin(false)} >
                    Login with phone number 
                  </p>
          
          </div>
        </form>
      )

  }
  else{
    return (
            // onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }
            <form>

       
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter Phone Number"
          />
          <div id="recaptcha-container"></div>
      
        <div className="button-right">
          {/* <Link to="/"> */}

            <button variant="secondary" style={{ backgroundColor: "blue", color: "white" }}>Cancel</button>
          {/* </Link> */}
          &nbsp;
          <button type="Submit" variant="primary" style={{ backgroundColor: "blue", color: "white" }}>

            Send Otp
          </button>
        </div>
        <p style={{ textAlign: "center", marginTop: "20px" }} onClick={() => setPhoneLogin(true)} >
          Login with email and password
        </p>
      </form>

      
      )


  }
   
}

export default UserLogin;
