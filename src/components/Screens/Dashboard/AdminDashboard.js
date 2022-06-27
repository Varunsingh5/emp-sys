import React from 'react';
import AdminSidebar from '../pages/Sidebar/AdminSidebar';



const AdminDashboard = () => {
  return (
    <>
      <div style={{ width: "30%" }}>
        <AdminSidebar />
      </div>
 <div style={{ width: "70%" }}>
      <h1 style={{marginLeft:"50%"}}>Welcome yo admin dashboard </h1>
      </div>

    </>
  )
}

export default AdminDashboard
