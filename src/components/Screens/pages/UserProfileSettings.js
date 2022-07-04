import React, { useState, useMemo, useEffect } from 'react'
import "./UserProfileSettings.css";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, list } from 'firebase/storage';
import { v4 } from 'uuid';
// import { async } from '@firebase/util';
// import { auth } from '../../../firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { update } from 'lodash';
import { getAuth, linkWithPhoneNumber, onAuthStateChanged, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { auth, db } from '../../../firebase';

const UserProfileSettings = () => {
  const [value, setValue] = useState('');
  const [fatherName,setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dob,setDob] = useState(" ");
  const [mobile,setMobile] = useState("");
  const [passport,setPassport] = useState("");
  const [adhaar,setAdhaar] = useState("");
  const [pancard,setPancard] = useState("");
  const [drivingLicense,setDrivingLicense] = useState("");
  const [about,setAbout] = useState("");
  const [position,setPosition] = useState("");
  const [company,setCompany] = useState("");
  const [schooling,setSchooling] = useState("");
  const [graduation,setGraduation] = useState("");
  const [address, setAddress] = useState("");
  const [city,setCity] = useState("");
  const [country, setCountry] = useState("");
  const [user, setUser] = useState({});
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }

  const [finalData,setFinalData] = useState();

  const getProfile = async () => {
    const user = auth.currentUser;

    // getting doc with using query phone no. in userList
    // query lagni doc get krna iss phone number se userList
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const data = docSnap.data();
      // Use a City instance method
      if (data?.isProfileSet == false) {
        console.log('false');
       }
       else{
        setFinalData(data) //set states for profile
       }
    } else {
      console.log("No such document!");
      return;
    }
  }
  useEffect(() => {
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
   
    const user = auth.currentUser;
    const ref = doc(db, "userProfile", user.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      alert("done")
        await updateDoc(doc(db, "userProfile", user.uid), {    
          isProfileSet: true,
          Date_of_birth: "",
          Father_Name: "",
          Mother_Name: "",
          Passport_Number:"",
          Adhaar_Card:"",
          Pan_Card:"",
          Driving_License: "",
          About:"",
        })
    } else {
      console.log("No such document!");
    }
    }

  //image uploading
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/")
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytesResumable(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList(() => [url])
      })

    })
  };

  useEffect(() => {
    list(imageListRef).then((response) => {
      console.log(response)
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList(() => [url]);
        })
      })
    })
  }, [])

  return (
    <div>
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          <input type="file" onChange={(event => { setImageUpload(event.target.files[0]) })} />
                          <button onClick={uploadImage}>Upload Image</button>
                          {imageList.map((url) => {
                            return <img src={url} />
                          })}

                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="" className="active nav-link" style={{ fontWeight: "bolder" }}>Personal Details</a></li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" novalidate="" onSubmit={formsubmit}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Father's Name</label>
                                      <input className="form-control" type="text" value={fatherName} onChange={(event) => {
                                        setFatherName(event.target.value);
                                      }} /> 
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mother's Name</label>
                                      {/* <input className="form-control" type="text" value={motherName} onChange={(event) => {
                                        setMotherName(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>D.O.B</label>
                                      {/* <input className="form-control" type="text" value={dob} onChange={(event) => {
                                        setDob(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mobile</label>
                                      {/* <input className="form-control" type="text" value={mobile} onChange={(event) => {
                                        setMobile(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Passport No.</label>
                                      {/* <input className="form-control" type="text" value={passport} onChange={(event) => {
                                        setPassport(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Adhaar Card</label>
                                      {/* <input className="form-control" type="text" value={adhaar} onChange={(event) => {
                                        setAdhaar(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Pan Card</label>
                                      {/* <input className="form-control" type="text" value={pancard} onChange={(event) => {
                                        setPancard(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Driving License</label>
                                      {/* <input className="form-control" type="text" value={drivingLicense} onChange={(event) => {
                                        setDrivingLicense(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label>About</label>
                                      {/* <textarea className="form-control" rows="5" value={about} onChange={(event) => {
                                        setAbout(event.target.value);
                                      }}  ></textarea> */}
                                    </div>
                                  </div>
                                </div>
                                <ul className="nav nav-tabs">
                                  <li className="nav-item"><a href="" className="active nav-link" style={{ fontWeight: "bolder" }}>Position</a></li>
                                </ul>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Current Position</label>
                                      {/* <input className="form-control" type="text" value={position} onChange={(event) => {
                                        setPosition(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Company Name</label>
                                      {/* <input className="form-control" type="text" value={company} onChange={(event) => {
                                        setCompany(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <ul className="nav nav-tabs">
                                  <li className="nav-item"><a href="" className="active nav-link" style={{ fontWeight: "bolder" }}>Education</a></li>
                                </ul>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Schooling</label>
                                      {/* <input className="form-control" type="text" value={schooling} onChange={(event) => {
                                        setSchooling(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Graduation</label>
                                      {/* <input className="form-control" type="text" value={graduation} onChange={(event) => {
                                        setGraduation(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <ul className="nav nav-tabs">
                                  <li className="nav-item"><a href="" className="active nav-link" style={{ fontWeight: "bolder" }}>Address</a></li>
                                </ul>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Current Address</label>
                                      {/* <input className="form-control" type="text" value={address} onChange={(event) => {
                                        setAddress(event.target.value);
                                      }} /> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input className="form-control" type="text" value={value} onChange={(event) => {
                                        // setCity(event.target.value);
                                      }} />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Country</label>
                                      <Select options={options} value={value} onChange={changeHandler} />
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div style={{ marginTop: "2%" }}>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">Update</button>
                                  <Link to="/user/dashboard">
                                    <button className="btn btn-primary" type="submit">Cancel</button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileSettings;