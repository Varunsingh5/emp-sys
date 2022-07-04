


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
  const [finalData, setFinalData] = React.useState();
  const [about, setAbout] = useState("");
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState("");
  const [dob, setDob] = useState(" ");
  const [mobile, setMobile] = useState("");
  const [passport, setPassport] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [pancard, setPancard] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [position, setPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [schooling, setSchooling] = useState("");
  const [graduation, setGraduation] = useState("");
  const [postGraduation, setPostGraduation] = useState("");
  const [marital, setMarital] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [vechileNumber, setVechileNumber] = useState("");
  const [vechileType, setVechileType] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentCountry, setPermanentCountry] = useState("");



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

  //upload pic
  const user = auth.currentUser;
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      alert("okjmoju")
        await updateDoc(doc(db, "userProfile", user.uid), {    
          isProfileSet: true,
          About: about,
          FatherName: fatherName,
          MotherName: motherName,
          Dob: dob,
          Mobile: mobile,
          Passport: passport,
          Adhaar: adhaar,
          Pancard: pancard,
          DrivingLicense: drivingLicense,
          Position: position,
          CompanyName: companyName,
          Schooling: schooling,
          Graduation: graduation,
          PostGraduation: postGraduation,
          Marital: marital,
          BloodGroup: bloodGroup,
          ParentContact: parentContact,
          VechileNumber: vechileNumber,
          VechileType: vechileType,
          CompanyEmail: companyEmail,
          CurrentAddress: currentAddress,
          CurrentCity: currentCity,
          CurrentCountry: currentCountry,
          PermanentAddress: permanentAddress,
          PermanentCity: permanentCity,
          PermanentCountry: permanentCountry,
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
        <div >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div className="about-avatar" style={{ textAlign: "center", marginLeft: "50%" }}>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>About Me</h3>
              <p>{finalData?.About}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h5 style={{ marginLeft: "50%" }}>Position :- {finalData?.Position}  </h5>
              <h5 style={{ marginLeft: "50%" }}>Company-Name :-   {finalData?.CompanyName}</h5>
              <h5 style={{ marginLeft: "50%" }}>Mobile-Number :-  {finalData?.Mobile} </h5>
              <h5 style={{ marginLeft: "50%" }}>Company-Email-Id :-   {finalData?.CompanyEmail}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Vechile Information :-</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Vechile-type :-   {finalData?.VechileType}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Vechile Number :-   {finalData?.VechileNumber}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Current-address</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Address :-  {finalData?.CurrentAddress} </h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>City :-  {finalData?.CurrentCity}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}> Country:-  {finalData?.CurrentCountry}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Permanent-address :-</h3>
              <h5 style={{ marginLeft: "50%" }}>Address :-  {finalData?.PermanentAddress}</h5>
              <h5 style={{ marginLeft: "50%" }}> city:-  {finalData?.PermanentCity}</h5>
              <h5 style={{ marginLeft: "50%" }}> Country:-  {finalData?.PermanentCountry}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Parent-Contact :-</h3>
              <h5 style={{ marginLeft: "50%" }}>Father_Name :- {finalData?.FatherName}  </h5>
              <h5 style={{ marginLeft: "50%" }}> Mother-Name:- {finalData?.MotherName}</h5>
              <h5 style={{ marginLeft: "50%" }}> Parent-Contact-Number:- {finalData?.ParentContact}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Personal-Information:-</h3>
              <h5 style={{ marginLeft: "50%" }}>Date-of-Birth :- {finalData?.Dob}  </h5>
              <h5 style={{ marginLeft: "50%" }}>Marital-Status :- {finalData?.Marital} </h5>
              <h5 style={{ marginLeft: "50%" }}>Blood-Group :- {finalData?.BloodGroup} </h5>
              {/* <h5 style={{ marginLeft:"50%" }}> city:-</h5>
<h5 style={{ marginLeft:"50%" }}> Country:-</h5> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Id Verification</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Adhaar card number :-  {finalData?.Adhaar}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Passport number :- {finalData?.Passport}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Pancard card number :- {finalData?.Pancard}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>DrivingLicense :- {finalData?.DrivingLicense}</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Education-Details</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Schooling :-  {finalData?.Schooling}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Graduation :- {finalData?.Graduation}</h5>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>PostGraduation :- {finalData?.PostGraduation}</h5>
            </Grid>
          </Grid>
        </div>
      </div>
      {isOpen && <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <Box sx={customStyles}>
        <form className="form" novalidate="" onSubmit={formsubmit}>
          <div >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }} >
                <label>Adhaar</label>
                <input className="form-control" onChange={(e) => setAdhaar(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <label>Pancard</label>
                <input className="form-control" onChange={(e) => setPancard(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>DrivingLicense</label>
                <input className="form-control" onChange={(e) => setDrivingLicense(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Passport</label>
                <input className="form-control" onChange={(e) => setPassport(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} >
                <label>Position</label>
                <input className="form-control" rows="1" onChange={(e) => setPosition(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Date Of Birth</label>
                <input className="form-control" onChange={(e) => setDob(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Marital-Status</label>
                <input className="form-control" onChange={(e) => setMarital(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Blood-Group</label>
                <input className="form-control" onChange={(e) => setBloodGroup(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Mother Name</label>
                <input className="form-control" onChange={(e) => setMotherName(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Father Name</label>
                <input className="form-control" onChange={(e) => setFatherName(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Parent-Contact</label>
                <input className="form-control" onChange={(e) => setParentContact(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Vechile-Type</label>
                <input className="form-control" onChange={(e) => setVechileType(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Vechile-Number</label>
                <input className="form-control" onChange={(e) => setVechileNumber(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Company-Name</label>
                <input className="form-control" onChange={(e) => setCompanyName(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>Mobile-Number</label>
                <input className="form-control" onChange={(e) => setMobile(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Company-Email-Id</label>
                <input className="form-control" onChange={(e) => setCompanyEmail(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ }}>
                <label>Schooling</label>
                <input className="form-control" onChange={(e) => setSchooling(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} >
                <label>Graduation</label>
                <input className="form-control" onChange={(e) => setGraduation(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>PostGraduation</label>
                <input className="form-control" onChange={(e) => setPostGraduation(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <label>Current-Address</label>
                <input className="form-control" onChange={(e) => setCurrentAddress(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <label>CurrentCity</label>
                <input className="form-control" onChange={(e) => setCurrentCity(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Current-Country</label>
                <input className="form-control" onChange={(e) => setCurrentCountry(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} >
                <label>Permanent-Address</label>
                <input className="form-control" onChange={(e) => setPermanentAddress(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} >
                <label>Permanent-City</label>
                <input className="form-control" onChange={(e) => setPermanentCity(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{ marginLeft: "15%" }}>
                <label>Permanent-Country</label>
                <input className="form-control" onChange={(e) => setPermanentCountry(e.target.value)} />
              </Grid>
              <Grid item xs={6} sm={3} style={{}}>
                <label>About</label>
                <textarea className="form-control" rows="5" onChange={(e) => setAbout(e.target.value)}></textarea>
              </Grid>
            </Grid>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">Update</button>&nbsp;
            </div>
          </div>
        </form>
        </Box>
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