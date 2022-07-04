import React, { useState } from 'react'
import Calendar from 'react-calendar';
import UserSidebar from './Sidebar/UserSidebar';
import 'react-calendar/dist/Calendar.css';
import { Grid } from '@mui/material';
// import { Grid } from '@material-ui/core';


const Calendar1 = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div style={{ width: "30%" }}>
        <UserSidebar />
      </div>
      <div style={{ width: "70%" }} >
        <div style={{ marginLeft: "50%", marginTop: "5%" }} >
          <Calendar onChange={onChange} value={value} />
        </div>
        <div>
          <Grid >
            <Grid >
              <h3 style={{ marginLeft: "50%", marginTop: "5%" }}>List Of Holidays</h3>
              <table className="table table-borderless table-stripped" style={{ marginLeft: "30%", marginTop: "5%" }} >
                <thead className="thead-light">
                  <tr >
                    <th> Date</th>
                    <th>Day</th>
                    <th>Event Name</th>
                  </tr>
                </thead>
                <tbody >
                </tbody>
              </table>
            </Grid>
          </Grid>
          <Grid >
          </Grid>
        </div>
      </div>
    </div>
  )
}
export default Calendar1