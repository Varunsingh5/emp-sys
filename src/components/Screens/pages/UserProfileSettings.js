import React, { useState, useMemo, useEffect } from 'react'
import "./UserProfileSettings.css";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, list } from 'firebase/storage';
import { v4 } from 'uuid';
import { async } from '@firebase/util';
import { auth, db } from '../../../firebase';
import Grid from '@mui/material/Grid';

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
  const [details,setDetails]=useState([]);

  const [companyName, setCompanyName] = useState("");
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




  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }
  
  const fetchDetails=async()=>{
    const response=db.collection('userList');
    const data=await response.get();
    data.docs.forEach(item=>{
     setDetails([...details,item.data()])
    })
}

useEffect(() => {
  fetchDetails();
}, [])


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
                     
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                        <form className="form" novalidate=""  >
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
          <div style={{ marginTop: "2%" }}>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button className="btn btn-primary" type="submit">Save Changes</button>&nbsp;
                                  <Link to="/user/dashboard">
                                    <button className="btn btn-primary" type="submit">Cancel</button>
                                  </Link>
                                </div>
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
