import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useNavigate } from "react-router";
import { logout, } from "../../../../firebase"


//import icons from react icons
import { FaList, } from "react-icons/fa";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";


const UserSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate);

    } catch (error) {
      console.log(error.message);
    }
  };



  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Squadminds"}</p>
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
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" onClick={handleLogout}><span className="ml-1">Logout</span></button>

            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
export default UserSidebar;
