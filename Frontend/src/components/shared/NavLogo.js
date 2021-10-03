import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import homeLogo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(-4),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4),
  
    },
    [theme.breakpoints.between('sm','md')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(-1),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4),

    
    },
    [theme.breakpoints.between('md','lg')]: {
      flexGrow: 1,
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(1),
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(4),

  
   },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      margin: theme.spacing(4),
     
   }
    
  }
}));

export default function NavLogo() {
  const classes = useStyles();
  //const theme = useTheme()

  return (
          <div className={classes.logo}  >
            <NavLink to="/" style={{textDecoration:'none'}} activeStyle={{color: '#208A2B', textDecoration: 'none'}}>
            <Box display="flex" alignItems="center" flexDirection="row" p={1} m={1}>
            {/* <Box p={1} >
            <img src={homeLogo} alt="homeLogo"  width="70px" height="60px"/>

        </Box> */}
        <Box p={1} >
        <h2 >ExamBall</h2>

        </Box>
              </Box>
            </NavLink>
          </div>
  );
}
