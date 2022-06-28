import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import UserSidebar from "../pages/Sidebar/UserSidebar"
import UserProfileSettings from './UserProfileSettings';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router";
import { logout, } from "../../../firebase"

const UserSettings = () => {
  const style = {
    position: "absolute",
    top: "0%",
    left: "50%",
    bottom: "-20%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "10%",
    bgColor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div >
       <div style={{ width: "30%" }}>
                <UserSidebar />
            </div>
      <Box sx={{ flexGrow: 1 }} >
      <Grid item md={4}>
      </Grid>
        <Grid item md={4} >
          <Button style={{ backgroundColor: "orange", color: "black" }} onClick={handleOpen}>Edit Profile</Button>
        </Grid>
        <br/>
        <Grid item md={4} >
          <Button style={{ backgroundColor: "orange", color: "black" }} onClick={handleLogout}>Logout</Button>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UserProfileSettings />
          </Box>
        </Modal>
      </Box>
    </div>
  )
}

export default UserSettings;
