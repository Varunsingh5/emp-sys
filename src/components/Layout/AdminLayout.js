import React from 'react';
import UserTable from '../Screens/UserTable/UserTable';
import AdminDashboard from '../Screens/Dashboard/AdminDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
        <Router>
            <Routes>
            <Route path="/admin/dashboard" exact component={AdminDashboard} />
            <Route path="/admin/users" exact component={UserTable} />
            </Routes>
       
        </Router>
    
    </div>
  )
}

export default AdminLayout
