// import React, { useEffect } from 'react'
// import UserSidebar from "../pages/Sidebar/UserSidebar";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import UserProfile from '../pages/UserProfile';
// // import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from '../../../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// const UserDashboard = () => {
//   // const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);

//   const getProfile = async () => {

//     // const auth= getAuth();
//     const user = auth.currentUser;
//     console.log(user);
//     const id = user.uid;
//     console.log(id);
//     const docRef = doc(db, "userProfile", id);
//     const docSnap = await getDoc(docRef);
//     const userData = docSnap.data();
//     console.log(userData)

//     if (!userData.isProfileSet) {
//       console.log('false');
//       // setOpen(true);
//       // <Modal
//       //     open={open}
//       //     onClose={handleClose}
//       //     aria-labelledby="modal-modal-title"
//       //     aria-describedby="modal-modal-description"
//       //   >
//       //     <form>
//       //       <input type="text"></input>
//       //     </form>
//       //   </Modal>



//     }
//     else {
//       console.log('is profile is true');
//     }


//     //get current users 
//     //get uid from user
//     //userProfile collection mai se  get doc with user uid
//     //if doc contains (isprofile is false then open model to set profile)

//     // after filling all fields in modal click submit update doc in user profile collection  do isprofile(true)


//     // else isprofile true then donot do any thing and return null

//   }

//   //   var authRef = auth();
//   //   authRef.onAuthStateChanged(auth(user) {
//   //       if (user) {
//   //           console.log('Display name onAuthStateChanged : '+user.displayName);
//   //           updateUserData();
//   //       } else {
//   //           console.log('not login');
//   //       }
//   //   });

//   //  const updateUserData = ()=>{
//   //     var userNow = firebase.auth().currentUser;
//   //       userNow.updateProfile({
//   //       displayName: "Jane Q. User",
//   //       photoURL: "https://example.com/jane-q-user/profile.jpg"
//   //     }).then(function() {
//   //       var displayName = userNow.displayName;
//   //       var photoURL = userNow.photoURL;
//   //     }, function(error) {
//   //     });
//   // }


//   useEffect(() => {

//     getProfile();
//   }, [])

//   return (

//     <>
//       <div style={{ width: "30%" }}>
//         <UserSidebar />
//       </div>
//       <div style={{ width: "70%" }}>
//         <h1 style={{ marginLeft: "50%" }}>Welome to user Dashboard</h1>
//         <div>
//           <div>
//             <Box sx={{ flexGrow: 1 }} >
//               <Grid container spacing={2}>
//                 <Grid item md={4}>

//                 </Grid>
//                 <Grid item md={4}>
//                   <div className="about-avatar">
//                     <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>About Me</h3>
//                   <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
//                   <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> <br />
//                 </Grid>
//                 <Grid item md={4}>

//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Father's Name</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Mother's Name</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>

//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>D.O.B</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Mobile</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>

//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Passport No</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//                 <Grid item md={4}>
//                   <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Adhaar Card</h3>
//                   <div className="media">
//                     <label>Phone No.:</label>
//                     <p>4552415789</p>
//                     <label>Email:</label>
//                     <p>abc@gmail.com</p>
//                   </div>
//                 </Grid>
//               </Grid>
//             </Box>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default UserDashboard;



import React, { useState,useEffect } from 'react'
import UserSidebar from "../pages/Sidebar/UserSidebar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import UserProfile from '../pages/UserProfile';
// import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import Modal from 'react-modal';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { update } from 'lodash';
import { getAuth, linkWithPhoneNumber, onAuthStateChanged, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const UserDashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [finalData,setFinalData] = React.useState();

  // Pan_Card:"",
  // Driving_License: "",
  const[about,setAbout]= useState("");

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [ isProfileSet, setIsProfileSet] = useState(false);

  const getProfile = async () => {
    // const auth= getAuth();
    
    const user = auth.currentUser;

    // query lagni doc get krna iss phone number se userList
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const data = docSnap.data();
      // Use a City instance method
      if (data?.isProfileSet == false) {
        console.log('false');
        setIsOpen(true);
       
       
       }
       else{
        setFinalData(data) //set states for profile
       }
    } else {
      console.log("No such document!");
      return;
    }
    //loader false

    // const docRef = doc(db, "userProfile", id);
    // const docSnap = await getDoc(docRef);
    // const userData = docSnap.data();

    // console.log(userData)
    // const q = query(collection(db, "userProfile"),);
    //   const querySnapshot = await getDocs(q);
    //   const dd = [];
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //     dd.push(doc.id);
    //   });
  
    // else {
    //   console.log('is profile is true');
    //   isProfileSet(true);
    //   return null;
    // }
  }
  useEffect(() => {
   //loder true
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
   if(currentuser){
     getProfile()
   }

    });
  }, [])

  const getData = async ()=>{
    const auth = getAuth();
    console.log(auth.currentUser.uid);
    const docRef = doc(db,'userProfile', auth.currentUser.uid);
    const userProfile =  await getDoc(docRef);
    const data = userProfile.data();
    setFinalData(data);
  }


  const formsubmit = async(e) => {
    e.preventDefault();

/////upload pic








    const user = auth.currentUser;
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {



      alert("okjmoju")
        await updateDoc(doc(db, "userProfile", user.uid), {    
          isProfileSet: true,
          // Date_of_birth: "",
          // Father_Name: "",
          // Mother_Name: "",
          // Passport_Number:"",
          // Adhaar_Card:"",
          // Pan_Card:"",
          // Driving_License: "",
          About: about,
        })
    } else {
      console.log("No such document!");
    }
    setIsOpen(false)

  }

 

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
                  {/* <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6> */}
                  <p>{finalData?.About}</p> <br />
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={4}>
                  {/* <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Contact</h3>
                  <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div> */}
                </Grid>
                <Grid item md={4}>
                  {/* <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Office Contact</h3> */}
                  {/* <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div> */}
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={4}>
                  {/* <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Personal Details</h3> */}
                  <div className="media">
                    {/* <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p> */}
                  </div>
                </Grid>
                <Grid item md={4}>
                  {/* <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Skills</h3>
                  <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div> */}
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Hobbies</h3>
                  {/* <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div> */}
                </Grid>
                <Grid item md={4}>
                  <h3 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Education</h3>
                  {/* <div className="media">
                    <label>Phone No.:</label>
                    <p>4552415789</p>
                    <label>Email:</label>
                    <p>abc@gmail.com</p>
                  </div> */}
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
      {isOpen &&  <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
         <form className="form" novalidate="" onSubmit={formsubmit}>
                            <div className="row">
                              <div className="col">
                                {/* <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Full Name</label>
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                  <div className="col">
                                  <div className="form-group">
                                      <label>Email</label>
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>D.O.B</label>
                                      <input className="form-control" type="number" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Father's Name</label>
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mother's Name</label>
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Passport no.</label>
                                      <input className="form-control" type="number" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mobile</label>
                                      <input className="form-control" type="number" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Adhaar Card</label>
                                      <input className="form-control" type="Number" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Pan Card</label>
                                      <input className="form-control"  />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Driving License</label>
                                      <input className="form-control"  />
                                    </div>
                                  </div>
                                </div> */}
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label>About</label>
                                      <textarea className="form-control" rows="5" onChange={(e)=>setAbout(e.target.value)}></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit" >Update</button>&nbsp;
                               
                              </div>
                            </div>
                          </form>
        </Modal>}
    </>
  )
}

export default UserDashboard;


 // auth.currentUser

    //get current users 
    //get uid from user

    //userProfile collection mai se  get doc with user uid

    //if doc contains (isprofile is false then open model to set profile)

    // after filling all fields in modal click submit     update doc in user profile collection  do isprofile(true)


    // else isprofile true then donot do any thing and return null