import React, { useState, useMemo, useEffect } from 'react'
import "./UserProfileSettings.css";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, list } from 'firebase/storage';
import { v4 } from 'uuid';
import { async } from '@firebase/util';

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


  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }
  const register = async() => {
   
  }

  const login = async() => {

  }

  const logout = async() => {

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
                        {/* <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                            <p className="mb-0">@johnny.s</p>
                          </div>
                        </div> */}
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="" className="active nav-link" style={{ fontWeight: "bolder" }}>Personal Details</a></li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" novalidate="">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Father's Name</label>
                                      <input className="form-control" type="text" onChange={(event)=>{
                                        setFatherName(event.target.value);
                                      }} />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mother's Name</label>
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
                                      <label>Mobile</label>
                                      <input className="form-control" type="number" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Passport No.</label>
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
                                      <input className="form-control" type="number" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Driving License</label>
                                      <input className="form-control" type="Number" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label>About</label>
                                      <textarea className="form-control" rows="5"></textarea>
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
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Company Name</label>
                                      <input className="form-control" type="text" />
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
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Graduation</label>
                                      <input className="form-control" type="text" />
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
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input className="form-control" type="text" />
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
                                  <button className="btn btn-primary" type="submit">Save Changes</button>&nbsp;
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
