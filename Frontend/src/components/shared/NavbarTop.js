import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NavLogo from './NavLogo'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:theme.spacing(2),
    marginTop:theme.spacing(-4)
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

export default function NavbarTop() {
  const classes = useStyles();
  //const theme = useTheme()

  return (
    <div className={classes.root}>
      
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
          <NavLogo />
          <div className={classes.title}>
          <NavLink to="/login"  style={{ textDecoration: 'none' }}> 
          <Button color="primary" className={classes.button}>Login</Button>
          </NavLink>
          <NavLink to="/register"  style={{ textDecoration: 'none' }}> 
          <Button  variant="contained" color="primary" className={classes.button}>Try For Free</Button>
          </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
