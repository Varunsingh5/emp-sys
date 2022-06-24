import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { useNavigate } from "react-router";
import { logout, } from "../../../../firebase"

const UserSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate);

    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div style={{height:"286%", marginTop:"-7%"}}> 
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Squadminds</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">User Profile</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Settings</CDBSidebarMenuItem>
          </CDBSidebarMenu>
          <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" onClick={handleLogout}><span className="ml-1">Logout</span></button>
        </CDBSidebarContent>
      </CDBSidebar>
      </div>
  );
};

export default UserSidebar;