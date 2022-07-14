import React, { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Link, Router, Navigate } from 'react-router-dom'
import AdminLogin from './components/Login/AdminLogin';
import AdminDashboard from './components/Screens/Dashboard/AdminDashboard';
import UserTable from './components/Screens/UserTable/UserTable';
import UserLogin from "../src/components/Login/UserLogin";
import SetPassword from "./components/Login/setPassword"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import UserProfile from './components/Screens/pages/UserProfile';
import UserProfileSettings from './components/Screens/pages/UserProfileSettings';
import UserSettings from './components/Screens/pages/UserSettings'

import UserDashboard from "../src/components/Screens/Dashboard/UserDashboard";
import Calendar1 from "../src/components/Screens/pages/Calendar1";

import LeaveTable from './components/Screens/pages/LeaveTable';


function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setTimeout(() => {
        console.log("fnjsdnfkjs", currentuser);
        setRole(role => localStorage.getItem("role"))
      }, 3000);

    });


    }, [])
    


  return (
    <div className="App">
      <nav >
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          </div>
        </div>
      </nav>
      {console.log("role in app", role)}
      <Routes>
        <Route path="/" element={role ? role === "user" ? <Navigate to="/user/dashboard" /> : <Navigate to="/admin/dashboard" /> : <Navigate to="/user/login" />} />

        <Route exact path="/user/login" element={role ? role === "user" ? <Navigate to="/user/dashboard" /> : <Navigate to="/admin/dashboard" /> : <UserLogin />} />
        <Route exact path="/admin/login" element={role ? role === "user" ? <Navigate to="/user/dashboard" /> : <Navigate to="/admin/dashboard" /> : <AdminLogin />} />

        <Route exact path="/user/dashboard" element={role ? role === "user" ? <UserDashboard /> : <Navigate to="/admin/dashboard" /> : <Navigate to="/" />} />

        <Route exact path="/admin/dashboard" element={role ? role === "user" ? <Navigate to="/admin/dashboard" /> : <AdminDashboard /> : <Navigate to="/" />} />

        <Route exact path="/user/setPassword" element={role ? role === "user" ? <Navigate to="/user/dashboard" /> : <Navigate to="/admin/dashboard" /> : <SetPassword />} />


        <Route exact path="/user/settings" element={<UserSettings />} />
        <Route exact path="/user/profile" element={<UserProfile />} />
        <Route exact path="/user/profile/settings" element={<UserProfileSettings />} />
        <Route exact path="/admin/user/table" element={<UserTable />} />

        <Route exact path="/user/*" element={<Navigate to="/" />} />
        <Route exact path="/admin/*" element={<Navigate to="/" />} />
        <Route exact path="/*" element={<Navigate to="/" />} />

        <Route exact path="user/Calendar" element={<Calendar1 />} />
        <Route exact path="user/leave/table" element={<LeaveTable />} />
      </Routes>
    </div>
  )
}

export default App
