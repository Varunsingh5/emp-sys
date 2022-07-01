import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import UserSidebar from "./Sidebar/UserSidebar";


const LeaveTable = () => {
  const [date, setDate] = useState(new DateObject());

  const calendarRef = useRef();

  function update(key, value) {
    let date = calendarRef.current.date;

    calendarRef.current.set(key, date[key] + value);

    setDate(new DateObject(date));
  }

  const style = {
    display: "inline-block",
    width: "90px",
    fontSize: "16px",
  };

  return (
    <div>
      <div style={{ width: "30%" }}>
        <UserSidebar />

      </div>
      <div style={{ width: "70%", marginTop: "5%" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginLeft: "50%" }}>
            <button onClick={() => update("month", 1)}>+</button>
            <span style={style}>{date.month.name}</span>
            <button onClick={() => update("month", -1)}>-</button>
          </div>
          <div style={{ marginLeft: "50%", }}>
            <button onClick={() => update("year", 1)}>+</button>
            <span style={style}>{date.year}</span>
            <button onClick={() => update("year", -1)}>-</button>
          </div>
          <div style={{ marginLeft: "60%", marginTop: "7%" }}>
            <Calendar
              ref={calendarRef}
            />
          </div>

          <div style={{ marginTop: "5%" }}>
            <Grid >
              <Grid >
                <table className="table table-borderless table-stripped" style={{ marginLeft: "30%" }} >
                  <thead className="thead-light">
                    <tr >
                      <th>Pending Leave</th>
                      <th>Taken Leave</th>
                      <th>Rejected Leave</th>

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

    </div>
  )
}

export default LeaveTable