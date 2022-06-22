import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from '../Screens/pages/UserProfile';
import USerSetting from '../Screens/pages/USerSetting';

const AdminLayout = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/userProfile" exact component={UserProfile} />
          <Route path="/user/setting" exact component={USerSetting} />

        </Routes>

      </Router>

    </div>
  )
}

export default AdminLayout
