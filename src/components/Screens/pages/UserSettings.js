import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import UserSidebar from "../pages/Sidebar/UserSidebar"
import UserProfileSettings from './UserProfileSettings';

const UserDashboard = () => {
    const style = {
        position: "absolute",
        top: "0%",
        left: "50%",
        bottom:"-20%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height:"10%",
        bgColor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4
      };

      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


    return (
        <div >
            <Button style={{backgroundColor:"orange", color:"black" }} onClick={handleOpen}>Edit Profile</Button>
            <Button onClick={handleOpen}>Other Settings</Button>  
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
            <UserSidebar />
        </div>
    )
}

export default UserDashboard;
