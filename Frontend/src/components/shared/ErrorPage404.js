
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ErrorPage404Image from '../../assets/images/ErrorPage404Image.svg'
import NavBarTop from '../../core/Menu'
import Footer from '../shared/Footer'
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom'
import NavBarBottom from '../shared/NavBarBottom'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer:{
      textAlign:'center'
  }
}));

export default function ErrorPage404({location}) {
    const classes = useStyles();
  return (
    
        <div className={classes.root}>
           <NavBarTop />
           <Grid container spacing={3} className={classes.gridContainer}>
           <Grid item xs={12}>
           <img src={ErrorPage404Image} alt="Error Page SVG" height="auto"/>
           <h2>No match found for <code>{location.pathname}</code></h2>
           <NavLink to="/"
            style={
              {textDecoration: 'none'}
            }
           >
           <Button type="submit" variant="contained" color="primary"
                                                className={
                                                    classes.submit
                                            }>
                                               Let's Go To Home
                                            </Button>
                            </NavLink>
          

        </Grid>
        
     </Grid>
     
<Footer />
<NavBarBottom />
</div>
    
  );
}