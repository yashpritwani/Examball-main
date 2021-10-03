import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NavLogo from '../components/shared/NavLogo'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:theme.spacing(2),
    marginTop:theme.spacing(-6),
    marginBottom:theme.spacing(-6)
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.between('sm','md')]: {
      marginRight: theme.spacing(2),
    flexGrow: 0.5,
    
    
    },
    [theme.breakpoints.between('md','lg')]: {
      marginRight: theme.spacing(2),
    flexGrow: 0.5,
  
   },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(2),
      flexGrow: 0.5,
     
   }
    
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(-4),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4)
    },
    [theme.breakpoints.between('sm','md')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(-1),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4)
    
    },
    [theme.breakpoints.between('md','lg')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(1),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4)
  
   },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      margin: theme.spacing(4),
     
   }
    
  },
  title: {
    flexGrow: 0.2,
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
    [theme.breakpoints.between('sm','md')]: {    
    },
    [theme.breakpoints.between('md','lg')]: {
   },
    [theme.breakpoints.up('lg')]: {
   }
    
  },
}));

const Menu = ({ history }) =>{
  const classes = useStyles();
  return  (
    
//   <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
//   <Navbar.Brand ><Link style={currentTab(history, "/")} to="/">Home</Link></Navbar.Brand>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="mr-auto">
//       {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//       </NavDropdown> */}
//     </Nav>
//     <Nav>
//     {isAutheticated() && isAutheticated().user.role === 0 && (
//       <Nav ><Link style={currentTab(history, "/user/dashboard")}
//       to="/user/dashboard">Dashboard</Link></Nav>
//       )}
//        {isAutheticated() && isAutheticated().user.role === 1 && (
//         <Nav><Link style={currentTab(history, "/admin/dashboard")}
//         to="/admin/dashboard">Admin Dashboard</Link></Nav>
//       )}
      
//       {!isAutheticated() && (
//         <Fragment>
//            <Nav><Link   style={currentTab(history, "/signup")}
//               to="/signup">Signup</Link></Nav>
//               <Nav><Link  style={currentTab(history, "/signin")}
//               to="/signin">SignIn</Link></Nav>
//         </Fragment>
//       )}
//       {isAutheticated() && (
//          <Nav><Link><span
//          onClick={() => {
//            signout(() => {
//              history.push("/");
//            });
//          }}
//        >
//          Signout
//        </span></Link> </Nav>
//       )}
//       {/* <Nav.Link eventKey={2} href="#memes">
//         Dank memes
//       </Nav.Link> */}
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>
<div className={classes.root}>
      
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
          <NavLogo />
          <div className={classes.title}>
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
          
          </div>
        </Toolbar>
      </AppBar>
    </div>
)};

export default withRouter(Menu);
