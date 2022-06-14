import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";

import meal1 from "../../../assets/dashboard/meal-1.svg";
import meal2 from "../../../assets/dashboard/meal-2.svg";
import meal3 from "../../../assets/dashboard/meal-3.svg";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import RechartsPieChart from "../../uielements/charts/components/RechartsPieChart";
import "react-calendar/dist/Calendar.css";
import "./Calendar2.css";

const AdminDashboard = () => {
  const [checkboxes, setCheckboxes] = useState([true, false]);

  const toggleCheckbox = (id) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox, index) => (index === id ? !checkbox : checkbox))
    );
  };

  const meals = [meal1, meal2, meal3];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Item>
                <div>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Widget className="">
                            <div className="d-flex justify-content-between widget-p-md">
                              <div
                                style={{
                                  textShadow: "0 0 3px pink, 0 0 5px skyblue",
                                }}
                              >
                                <h6>Recent Progress</h6>
                              </div>
                            </div>
                            <ApexActivityChart className="pb-4" />
                          </Widget>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3} style={{ marginTop: "5%" }}>
              <Item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }}>
                      Total Projects
                    </Typography>
                    <Typography variant="h5" component="div">
                      2.562
                    </Typography>
                    <Typography variant="body2">
                      2.65% less than usual
                    </Typography>
                  </CardContent>
                </Card>
              </Item>

              <Item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }}>
                      Total Meetings
                    </Typography>
                    <Typography variant="h5" component="div">
                      17.212
                    </Typography>
                    <Typography variant="body2">
                      5.50 more than usual
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>

            <Grid item xs={3} style={{ marginTop: "5%" }}>
              <Item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }}>
                      Completed Projects
                    </Typography>
                    <Typography variant="h5" component="div">
                      2.562
                    </Typography>
                    <Typography variant="body2">
                      8.3% more than usual
                    </Typography>
                  </CardContent>
                </Card>
              </Item>

              <Item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }}>
                      Pending Projects
                    </Typography>
                    <Typography variant="h5" component="div">
                      43
                    </Typography>
                    <Typography variant="body2">
                      -4.25% less than usual
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Item>
                <div className="app">
                  <h6
                    className="text-center"
                    style={{ textShadow: "0 0 3px pink, 0 0 5px skyblue" }}
                  >
                    Calendar
                  </h6>
                  <div
                    className="calendar-container"
                    style={{ marginLeft: "8%" }}
                  >
                    <Calendar
                      onChange={setDate}
                      selectRange={true}
                      defaultView="decade"
                    />
                  </div>
                  {date.length > 0 ? (
                    <p className="text-center">
                      <span className="bold">Start:</span>{" "}
                      {date[0].toDateString()}
                      &nbsp;|&nbsp;
                      <span className="bold">End:</span>{" "}
                      {date[1].toDateString()}
                    </p>
                  ) : (
                    <p className="text-center">
                      <span className="bold">Default selected date:</span>{" "}
                      {date.toDateString()}
                    </p>
                  )}
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "5%" }}>
              <Item>
                <Widget>
                  <div>
                    <h6 style={{ textShadow: "0 0 3px pink, 0 0 5px skyblue" }}>
                      Donut chart
                    </h6>
                  </div>
                  <RechartsPieChart />
                </Widget>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div style={{ marginTop: "2%" }}>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Assignee</th>
              <th scope="col">Project Client</th>
              <th scope="col">Project Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Project Apollo</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Complete</td>
            </tr>
            <tr>
              <th scope="row">Project Fireball</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>In progress</td>
            </tr>
            <tr>
              <th scope="row">Project Hades</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>Cancelled</td>
            </tr>
            <tr>
              <th scope="row">Project Nitro</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Complete</td>
            </tr>
            <tr>
              <th scope="row">Project Phoenix</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>Complete</td>
            </tr>
            <tr>
              <th scope="row">Project Romeo</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>In progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
