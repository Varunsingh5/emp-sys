// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumbs from "../../../components/Breadbrumbs/Breadcrumbs";

// import Text from "../../typography/Profile";
// import Tables from "../../tables/Tables";
// import Notifications from "../../notifications/Notifications"
// import Charts from "../../uielements/charts/Charts";
// import Icons from "../../uielements/icons/IconsPage";
import Maps from "../../uielements/maps/google/GoogleMapPage";

// -- Component Styles
import s from "./userLayout.module.scss";
import UserDashboard from "../dashboard/UserDashboard";
import Profile from "../../profile/Profile";
import Projects from "../../Projects/Projects";
import Tables from "../../Tables/Tables";
import Calendar1 from "../../Calendar/Calendar1";
//  import Maps from "../../uielements/maps/google/GoogleMapPage";
import Charts from "../../uielements/charts/Charts";
import Contacts from "../../AdminSidebar/Contacts";

const UserLayout = (props) => {
  console.log("in layout");
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={window.location.pathname} />
          <Switch>
            <Route
              path="/user"
              exact
              render={() => <Redirect to="/user/dashboard" />}
            />
            <Route path="/user/dashboard" exact component={UserDashboard} />
            <Route path="/user/profile" exact component={Profile} />
            <Route path="/user/project" exact component={Projects} />
            <Route path="/user/tables" exact component={Tables} />
            <Route path="/user/calendar" exact component={Calendar1} />
            <Route path="/user/charts" exact component={Charts} />
            <Route path="/user/maps" exact component={Maps} />
            <Route path="/user/contacts" exact component={Contacts} />
            {/* <Route path="/user/notifications" exact component={Notifications} /> */}
            {/* <Route path="/user/ui-elements" exact render={() => <Redirect to={"/template/ui-elements/charts"} />} /> */}
            {/* <Route path="/user/ui-elements/charts" exact component={Charts} />
            <Route path="/user/ui-elements/icons" exact component={Icons} />
            <Route path="/user/ui-elements/maps" exact component={Maps} /> */}
            <Route path="*" exact render={() => <Redirect to="/user" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(UserLayout));
