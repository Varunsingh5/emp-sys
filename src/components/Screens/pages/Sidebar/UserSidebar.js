<<<<<<< HEAD
import React from 'react';
=======

//import useState hook to create menu collapse state
import React, { useState } from "react";
>>>>>>> 0c2a7d4938f5bd2487d221a7388bd8d5d14831f6
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
<<<<<<< HEAD
=======
//import icons from react icons
import { FaList, } from "react-icons/fa";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
>>>>>>> 0c2a7d4938f5bd2487d221a7388bd8d5d14831f6

const UserSidebar = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

  const handleLogout = async () => {
    try {
      await logout(navigate);

=======
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const handleLogout = async () => {
    try {
      await logout(navigate);
>>>>>>> 0c2a7d4938f5bd2487d221a7388bd8d5d14831f6
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


 
  
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Squadminds" : "Squadminds"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick} style={{ marginBottom: "10px" }}>
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                User Profile
              </MenuItem>
              <MenuItem icon={<FaList />}>Settings</MenuItem>
              <MenuItem icon={<FaList />}>Calendar</MenuItem>
              <MenuItem icon={<FaList />}>LeaveTable</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" onClick={handleLogout}><span className="ml-1">Logout</span></button>
            </Menu>
          </SidebarFooter>
        </ProSidebar>

      </div>
      </div>
  );
};

export default UserSidebar;