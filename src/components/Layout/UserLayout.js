import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from '../Screens/pages/UserProfile';

const AdminLayout = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/userProfile" exact component={UserProfile} />
          <Route path="/user/setting" exact component={Setting} />

        </Routes>

      </Router>

    </div>
  )
}

export default AdminLayout
