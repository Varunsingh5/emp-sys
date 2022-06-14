import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

import AdminLogin from './components/Login/AdminLogin';
import UserLogin from './components/Login/UserLogin';

// import SignUp from './components/signup.component'

function App() {
  return (
    <div className="App">
      {/* className="navbar navbar-expand-lg navbar-light fixed-top" */}
      <nav >
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'}>
            Squadminds Pvt. Ltd.
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-in'}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-up'}>
                  Sign up
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/" element={<UserLogin />} />
        <Route path="/sign-in" element={<AdminLogin />} />
      
      </Routes>
    </div>
  )
}

export default App