import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'


import UserLogin from "./components/Login/UserLogin";
// import SignUp from './components/signup.component'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'}>
            Squadminds Pvt. Ltd.
          </Link>
          <div >
          
          </div>
        </div>
      </nav>
      <Routes>
        
        <Route path="/" element={<UserLogin />} />
      </Routes>
    </div>
  )
}

export default App
