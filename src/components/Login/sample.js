import React from 'react'

const sample = () => {
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
    <div id="recaptcha-container"></div>
    </form></div>
  )
}

export default sample
