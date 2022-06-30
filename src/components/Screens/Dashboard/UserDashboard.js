import React, { useEffect } from 'react'
import UserSidebar from "../pages/Sidebar/UserSidebar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserProfile from '../pages/UserProfile';
// import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserDashboard = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const getProfile = async () => {

    // const auth= getAuth();
    const user = auth.currentUser;
    console.log(user);
    const id = user.uid;
    console.log(id);
    const docRef = doc(db, "userProfile", id);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    console.log(userData)


    if (!userData.isProfileSet) {
      console.log('false');
      // setOpen(true);
      // <Modal
      //     open={open}
      //     onClose={handleClose}
      //     aria-labelledby="modal-modal-title"
      //     aria-describedby="modal-modal-description"
      //   >
      //     <form>
      //       <input type="text"></input>
      //     </form>
      //   </Modal>



    }
    else {
      console.log('is profile is true');
    }


    //get current users 
    //get uid from user
    //userProfile collection mai se  get doc with user uid
    //if doc contains (isprofile is false then open model to set profile)

    // after filling all fields in modal click submit update doc in user profile collection  do isprofile(true)


    // else isprofile true then donot do any thing and return null

  }

  //   var authRef = auth();
  //   authRef.onAuthStateChanged(auth(user) {
  //       if (user) {
  //           console.log('Display name onAuthStateChanged : '+user.displayName);
  //           updateUserData();
  //       } else {
  //           console.log('not login');
  //       }
  //   });

  //  const updateUserData = ()=>{
  //     var userNow = firebase.auth().currentUser;
  //       userNow.updateProfile({
  //       displayName: "Jane Q. User",
  //       photoURL: "https://example.com/jane-q-user/profile.jpg"
  //     }).then(function() {
  //       var displayName = userNow.displayName;
  //       var photoURL = userNow.photoURL;
  //     }, function(error) {
  //     });
  // }


  useEffect(() => {

    getProfile();
  }, [])

  return (

    <>
      <div style={{ width: "30%" }}>
        <UserSidebar />
      </div>
      <div style={{ width: "70%" }}>
        <h1 style={{ marginLeft: "50%" }}>Welome to user Dashboard</h1>
        <div>
          <div>
            <Box sx={{ flexGrow: 1 }} >
              <Grid container spacing={2}>
                <Grid item md={4}>

                </Grid>
                <Grid item md={4}>
                  <div className="about-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>About Me</h3>
                  <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
                  <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> <br />
                </Grid>
                <Grid item md={4}>

                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Contact</h3>
                  <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Office Contact</h3>
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
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Personal Details</h3>
                  <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Skills</h3>
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
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Hobbies</h3>
                  <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Education</h3>
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
      </div>
    </>
  )
}

export default UserDashboard;