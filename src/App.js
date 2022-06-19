import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Link, Router } from 'react-router-dom'
// import SignUp from './components/signup.component'
import UserLogin from "../src/components/Login/UserLogin";
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import UserDashboard from './components/Screens/Dashboard/UserDashboard';

function App() {
  const email = localStorage.getItem("myEmail");
  return (
    <div className="App">
      {/* className="navbar navbar-expand-lg navbar-light fixed-top" */}
      <nav >
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          </div>
        </div>
      </nav>
      <UserAuthContextProvider>
        <Routes>
          {email ?
            <Route path="/user/dashboard" element={<UserDashboard />} />
            :
            <Route path="/" element={<UserLogin />} />
          }
        </Routes>
      </UserAuthContextProvider>


    </div>
  )
}

export default App