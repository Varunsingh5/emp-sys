import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Link, Router } from 'react-router-dom'
import AdminLogin from './components/Login/AdminLogin';
import AdminDashboard from './components/Screens/Dashboard/AdminDashboard';
// import SignUp from './components/signup.component'
import UserLogin from "../src/components/Login/UserLogin";
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import SetPassword from './components/Login/setPassword';
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import UserDashboard from './components/Screens/Dashboard/UserDashboard';

function App() {
  return (
    <div className="App">
      {/* className="navbar navbar-expand-lg navbar-light fixed-top" */}
      <nav >
        <div className="container">
          {/* <Link className="navbar-brand" to={'/sign-in'}> */}
          {/* <h1>Squadminds Pvt. Ltd.</h1>   */}
          {/* </Link> */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          </div>
        </div>
      </nav>

      {/* <Routes>

       

        <Route exact path="/admin/login" element={<AdminLogin />} />


        <Route exact path="/user/setPassword" element={<SetPassword />} />

        <Route path="/sign-in" element={<AdminLogin />} />


        <Route path="/" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserTable />} />


      </Routes>  */}
       <UserAuthContextProvider>
       <Routes>
         <Route path="/user/dashboard" element={<UserDashboard />} />
         <Route path="/" element={<UserLogin />} />
       </Routes>
     </UserAuthContextProvider>


    </div>
  )
}

export default App