import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../../auth/helper";
const useStyles = makeStyles((theme)=>({
  root: {
    width:"100%",
    [theme.breakpoints.down('sm')]: {
     

    },
    [theme.breakpoints.between('sm','md')]: {
      marginRight: theme.spacing(2),
    flexGrow: 0.5,
    display:'none'
    
    
    },
    [theme.breakpoints.between('md','lg')]: {
      marginRight: theme.spacing(2),
    flexGrow: 0.5,
    display:'none'
  
   },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(2),
      flexGrow: 0.5,
      display:'none'
     
   }
  },
  title:{
    flexGrow: 0.2,
    justifyContent:"space-evenly"
  },
  button:{
    margin: theme.spacing(0.5),
  }
}));

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" };
  } else {
    return { color: "#FFFFFF" };
  }
};
 function NavBarBottom({ history }) {
  
  const classes = useStyles();
  return (
    <React.Fragment>
    <AppBar position="fixed" color="white" style={{top: "auto", bottom: -8}} className={classes.root}>
    <Toolbar>
  {/* <Typography variant="h6" className={classes.title}>
    News
  </Typography> */}
  {/* <Grid container alignItems="center" className={classes.title}>
  <NavLink to="/login"  style={{ textDecoration: 'none' }}> 
  <Button color="primary" className={classes.button}>Login</Button>
  </NavLink>
  <Divider orientation="vertical" flexItem/>
  <NavLink to="/register"  style={{ textDecoration: 'none' }}> 
  <Button  variant="contained" color="primary" className={classes.button}>Try For Free</Button>
  </NavLink>
  </Grid> */}
  <Grid container  alignItems="center" className={classes.title}>
          {isAutheticated() && isAutheticated().role === 'Student' && (
     <NavLink to="/user/dashboard"  style={{ textDecoration: 'none' }}> 
     <Button color="primary" className={classes.button}>Dashboard</Button>
     </NavLink>
      )}
      {isAutheticated() && isAutheticated().role === 'Admin' && (
     <NavLink to="/admin/dashboard"  style={{ textDecoration: 'none' }}> 
     <Button color="primary" className={classes.button}>Admin Dashboard</Button>
     </NavLink>
      )}
      {!isAutheticated() && (
        <React.Fragment>
           <NavLink to="/signin"  style={{ textDecoration: 'none' }}> 
          <Button color="primary" className={classes.button}>Login</Button>
          </NavLink>
          <NavLink to="/signup"  style={{ textDecoration: 'none' }}> 
          <Button  variant="contained" color="primary" className={classes.button}>Try For Free</Button>
          </NavLink>
        </React.Fragment>
      )}
      {isAutheticated() && (
        //  <NavLink to="/signout"  style={{ textDecoration: 'none' }}> 
         <Button onClick={() => {
           signout(() => {

             history.push("/");
             window.location.reload(true)

           });
         }} variant="contained" color="primary" className={classes.button}>Signout</Button>
        //  </NavLink>
      )}
          
          </Grid>
</Toolbar>
    </AppBar>
</React.Fragment>
  );
}

export default withRouter(NavBarBottom)