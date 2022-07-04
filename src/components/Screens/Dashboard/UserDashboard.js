
import React, { useState, useEffect, } from 'react'
import UserSidebar from "../pages/Sidebar/UserSidebar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { auth, db, } from '../../../firebase';
import Modal from 'react-modal';
import { doc, getDoc, updateDoc, } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, } from 'firebase/auth';


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
  const [company, setCompany] = useState("");
  const [schooling, setSchooling] = useState("");
  const [graduation, setGraduation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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

  const getProfile = async () => {

    const user = auth.currentUser;
    // query lagni doc get krna iss phone number se userList
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.isProfileSet === false) {
        console.log('false');
        setIsOpen(true);
      }
      else {
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
      if (currentuser) {
        getProfile()
      }
    });
  }, [])

  const getData = async () => {
    const auth = getAuth();
    console.log(auth.currentUser.uid);
    const docRef = doc(db, 'userProfile', auth.currentUser.uid);
    const userProfile = await getDoc(docRef);
    const data = userProfile.data();
    setFinalData(data);
  }

  const formsubmit = async (e) => {
    e.preventDefault();
    /////upload pic

    const user = auth.currentUser;
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {

      alert("okjmoju")
      await updateDoc(doc(db, "userProfile", user.uid), {
        isProfileSet: true,
        About: about,
        Father_Name: fatherName,
        MotherName: motherName,
        Dob: dob,
        Mobile: mobile,
        Passport: passport,
        Adhaar: adhaar,
        Pancard: pancard,
        DrivingLicense: drivingLicense,
        Position: position,
        Company: company,
        Schooling: schooling,
        Graduation: graduation,
        Address: address,
        City: city,
        Country: country,
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

              {/* <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Company-Information:-</h3> */}

              <h5 style={{ marginLeft: "50%" }}>Position :- {finalData?.Position}  </h5>


              <h5 style={{ marginLeft: "50%" }}>Company-Name :-   {finalData?.Company}</h5>


              <h5 style={{ marginLeft: "50%" }}>Mobile-Number :-  {finalData?.Mobile} </h5>

              <h5 style={{ marginLeft: "50%" }}>Company-Email-Id :-   </h5>

              {/* <h5 style={{ marginLeft:"50%" }}> city:-</h5>

<h5 style={{ marginLeft:"50%" }}> Country:-</h5> */}



            </Grid>





            <Grid item xs={12} sm={6}>

              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Vechile Information :-</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Vechile-type :-</h5>

              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Vechile Number :-</h5>

            </Grid>


            <Grid item xs={12} sm={6}>
              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', textAlign: "center", marginLeft: "50%" }}>Current-address</h3>
              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Address :-  </h5>

              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>Land-Mark  :-</h5>


              <h5 style={{ textAlign: "center", marginLeft: "50%" }}>City :-</h5>


              <h5 style={{ textAlign: "center", marginLeft: "50%" }}> Country:-</h5>


            </Grid>

            <Grid item xs={12} sm={6}>

              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Permanent-address :-</h3>

              <h5 style={{ marginLeft: "50%" }}>Address :-</h5>

              <h5 style={{ marginLeft: "50%" }}> Land-Mark:-</h5>

              <h5 style={{ marginLeft: "50%" }}> city:-</h5>

              <h5 style={{ marginLeft: "50%" }}> Country:-</h5>



            </Grid>


            <Grid item xs={12} sm={6}>

              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Parent-Contact :-</h3>

              <h5 style={{ marginLeft: "50%" }}>Father_Name :- {finalData?.FatherName}  </h5>

              <h5 style={{ marginLeft: "50%" }}> Mother-Name:- {finalData?.MotherName}</h5>


              <h5 style={{ marginLeft: "50%" }}> Parent-Contact-Number:- {finalData?.MotherName}</h5>



              {/* <h5 style={{ marginLeft:"50%" }}> city:-</h5>

<h5 style={{ marginLeft:"50%" }}> Country:-</h5> */}



            </Grid>


            <Grid item xs={12} sm={6}>

              <h3 class="dark-color" style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "50%" }}>Personal-Information:-</h3>

              <h5 style={{ marginLeft: "50%" }}>Date-of-Birth :- {finalData?.Dob}  </h5>

              <h5 style={{ marginLeft: "50%" }}>Marital-Status :-  </h5>

              <h5 style={{ marginLeft: "50%" }}>Blood-Group :-  </h5>


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


          </Grid>
        </div>













        {/* {finalData?.Passport}
       {finalData?.Adhaar}
       {finalData?.Pancard}
<p>{finalData?.DrivingLicense}</p> */}
        {/*   <p>{finalData?.Father_Name}</p>
        <p>{finalData?.MotherName}</p>  */}
        {/* <p>{finalData?.Dob}</p> */}
        {/* <p>{finalData?.Mobile}</p> */}
        {/* <p>{finalData?.Company}</p> */}
        <p>{finalData?.Schooling}</p>
        {/* <p>{finalData?.Position}</p> */}
        <p>{finalData?.Graduation}</p>
        <p>{finalData?.Address}</p>
        <p>{finalData?.City}</p>
        <p>{finalData?.Country}</p>

      </div>
      {isOpen && <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="form" novalidate="" onSubmit={formsubmit}>



        <div >
      <Grid container spacing={3}>
        
       
        <Grid item xs={6} sm={3}>
        <label>About</label>
                    <textarea className="form-control" rows="5" onChange={(e) => setAbout(e.target.value)}></textarea>
        </Grid>
        <Grid item xs={6} sm={3}>
          
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
  
        </Grid>


 
        <Grid item xs={6} sm={3} style={{marginLeft:"5%"}}>
        <label>Adhaar</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setAdhaar(e.target.value)}></textarea>
         </Grid>
         <Grid item xs={6} sm={3}>
         <label>Pancard</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setPancard(e.target.value)}></textarea>
         </Grid>
         <Grid item xs={6} sm={3}>
         <label>DrivingLicense</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setDrivingLicense(e.target.value)}></textarea>
         </Grid>
         <Grid item xs={6} sm={3}>
         <label>Position</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setPosition(e.target.value)}></textarea>
         </Grid>
 
        
      </Grid>
    </div>
          <div className="row">
            <div className="col">

              <div className="row">
                <div className="col mb-3">
                  {/* <div className="form-group"> */}
                    {/* <label>About</label>
                    <textarea className="form-control" rows="5" onChange={(e) => setAbout(e.target.value)}></textarea> */}
                  {/* </div> */}

                  <div className="form-group">
                    <label>Mother Name</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setMotherName(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Father Name</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setFatherName(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>D.O.B Name</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setDob(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Mobile</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setMobile(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Passport </label>
                    <textarea className="form-control" rows="1" onChange={(e) => setPassport(e.target.value)}></textarea>
                  </div>


                  {/* <div className="form-group">
                    <label>Adhaar</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setAdhaar(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Pancard</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setPancard(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>DrivingLicense</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setDrivingLicense(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Position</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setPosition(e.target.value)}></textarea>
                  </div> */}

                  <div className="form-group">
                    <label>Company</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setCompany(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Schooling</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setSchooling(e.target.value)}></textarea>
                  </div>


                  <div className="form-group">
                    <label>Graduation</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setGraduation(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setAddress(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setCity(e.target.value)}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <textarea className="form-control" rows="1" onChange={(e) => setCountry(e.target.value)}></textarea>
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

