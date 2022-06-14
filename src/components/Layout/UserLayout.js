import React from 'react';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from '../Screens/pages/UserProfile';

const AdminLayout = () => {
  return (
    <div>
        <Router>
            <Routes>
            <Route path="/user/userProfile" exact component={UserProfile} />
           
            </Routes>
       
        </Router>
    
    </div>
  )
}

export default AdminLayout
