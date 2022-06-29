import React, { useState, useMemo }from 'react'
import "./UserProfileSettings.css";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'

const UserProfileSettings = () => {

  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }

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
                          <div className="mx-auto" style={{ width: "140px" }}>
                            <div className="d-flex justify-content-center align-items-center rounded" style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}>
                              <img style={{ color: " rgb(166, 168, 170); font: bold 8pt Arial" }}/>
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                            <p className="mb-0">@johnny.s</p>
                            <div className="mt-2">
                              <input type="file"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="" className="active nav-link" style={{fontWeight:"bolder"}}>Personal Details</a></li>
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
                                      <input className="form-control" type="text" />
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
                                <li className="nav-item"><a href="" className="active nav-link" style={{fontWeight:"bolder"}}>Position</a></li>
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
                                <ul className="nav nav-tabs">
                                <li className="nav-item"><a href="" className="active nav-link" style={{fontWeight:"bolder"}}>Education</a></li>
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
                                <ul className="nav nav-tabs">
                                <li className="nav-item"><a href="" className="active nav-link" style={{fontWeight:"bolder"}}>Address</a></li>
                              </ul>
                              <div className="row">
                                  <div className="col">
                                  <div className="form-group">
                                      <label>Current Address</label>
                                      <input className="form-control" type="text" />
                                    </div>
                                  </div>
                                  {/* <div className="col">
                                  <div className="form-group">
                                      <label>Permanent Address</label>
                                      <textarea className="form-control" rows="5"></textarea>
                                    </div>
                                  </div> */}
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
                            <div style={{marginTop:"2%"}}>
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
