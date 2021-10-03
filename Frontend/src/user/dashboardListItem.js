import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import allCourses from  './allCourses'
import { Link,Redirect} from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/user/dashboard" style={{textDecoration:'none', color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" >
       <allCourses />
      </ListItemText>
      
    </ListItem>
</Link>
<Link to="/user/my-courses" style={{textDecoration:'none',color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Courses" />
    </ListItem>
    </Link>
     <Link to="/user/all-courses" style={{textDecoration:'none', color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="All Courses" />
    </ListItem>
    </Link>
    <Link to="/user/results" style={{textDecoration:'none', color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Results" />
    </ListItem>
    </Link>
    <Link to="/user/profile" style={{textDecoration:'none', color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Ongoing/Recent Tests</ListSubheader>
    <Link to="/user/recent" style={{textDecoration:'none', color: "inherit"}}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="AWS1" />
    </ListItem>
    </Link>
   */}
  </div>
);