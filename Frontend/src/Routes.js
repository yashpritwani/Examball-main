import React from "react";
import { BrowserRouter, Switch, Route,Router } from "react-router-dom";
import HomeContainer from './components/home/homepage'
import ErrorPage404 from './components/shared/ErrorPage404'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";

import SpecificCourse from './components/courses/specificCourse'
import TestDetail from "./user/testDetail";
import allCourses from './user/allCourses'
import SpecificCourseDashboard from './user/specificCourse'
import userProfile from './user/userAccount/index'
import ExamScreen from './user/examScreen/ExamScreen'
import {signout,isAutheticated} from './auth/helper/index'
import Result from './user/examScreen/components/Result'
import history from "./history";
import MyCourses from './user/myCourses'
import Results from './user/results'
import AllCourses from './components/courses/allCourses'

const user = isAutheticated();
const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/courses/:courseId" component={SpecificCourse} />
     

        <Route path="/all-courses/" component={AllCourses} />

              {/* <Route path="/landing-page" component={LandingPage} /> */}
            
         <Route exact path="/contact-us" component={ContactUs} ></Route>
              <Route exact path="/about-us" component={AboutUs} ></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/test/:id" exact component={TestDetail} />
        <PrivateRoute path="/user/test/:id/exam/start" exact component={ExamScreen} />
        <PrivateRoute path="/user/test/:id/exam/session/:sessionId/result" exact component={Result} />
        <PrivateRoute path="/user/all-courses" exact component={allCourses} />
        <PrivateRoute path="/user/my-courses" exact component={MyCourses} />
        <PrivateRoute path="/user/results"  exact component={Results} />
        <PrivateRoute path="/user/courses/:courseId" exact component={SpecificCourseDashboard} />
        <PrivateRoute path="/user/profile" exact component={userProfile} />

        
        <Route component={ErrorPage404} />
      </Switch>
    </Router>
  );
};

export default Routes;
