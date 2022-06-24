import React from 'react'
import UserSidebar from "../pages/Sidebar/UserSidebar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserProfile from '../pages/UserProfile';

const UserDashboard = () => {
    return (
        <div>
        <div>
        <Box sx={{ flexGrow: 1 }} >
           <Grid container spacing={2}>
              <Grid item md={4}>
             <UserSidebar />
              </Grid>   
              <Grid item md={4}>
        <div className="about-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt=""/>
                </div>
        </Grid>
              <Grid item md={4}>
              <h3 class="dark-color" style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>About Me</h3>
            <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
            <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> <br/> 
              </Grid>
              <Grid item md={4}>
              
              </Grid>
              <Grid item md={4}>
              <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Contact</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
              </Grid>
              <Grid item md={4}>
              <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Office Contact</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
              </Grid>
              <Grid item md={4}>
              
              </Grid>
              <Grid item md={4}>
              <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Personal Details</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
              </Grid>
              <Grid item md={4}>
              <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Skills</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
            </Grid>
            <Grid item md={4}>
              
              </Grid>
            <Grid item md={4}>
        <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Hobbies</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
        </Grid>
        <Grid item md={4}>
        <h3 style={{textShadow: '0 0 3px pink, 0 0 5px skyblue'}}>Education</h3>
            <div className="media">
            <label>Phone No.:</label>
            <p>4552415789</p>
            <label>Email:</label>
            <p>abc@gmail.com</p>
            </div>
        </Grid>
            </Grid>
          </Box>
          </div>
              </div>  
    )
}

export default UserDashboard;
