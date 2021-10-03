import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from './shared/Footer';
import NavBarTop from '../core/Menu'
import Typography from '@material-ui/core/Typography';
import AboutUsPageImage from '../assets/images/AboutUsPageImage.svg'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {NavLink} from 'react-router-dom'
import NavBarBottom from './shared/NavBarBottom'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(-2)

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left'
        
        
    },
    palette:{
        primary:{
            main:theme.palette.primary.main
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        textAlign:'center'
      },
    image: {
        [theme.breakpoints.down('sm')]: {
            display:'none'
           
          },
          [theme.breakpoints.between('sm','md')]: {
            display:'none'
          
          },
          [theme.breakpoints.between('md','lg')]: {
            backgroundImage: `url(${AboutUsPageImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            backgroundSize: 'contain',
            backgroundPosition: 'left',
            height: "auto",
         },
          [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${AboutUsPageImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            backgroundSize: 'contain',
            backgroundPosition: 'left',
            height: "auto",
           
         }
    }
}));



export default function AboutUs() {
    const classes = useStyles();
    const primaryColor = "#208A2B"
    return (

        <React.Fragment>
            <NavBarTop />
            <div className={
                classes.root
            }>
                <Container fixed>
                    <Grid container
                        spacing={3}>
                        <Grid item
                            xs={false}
                            lg={1}
                        />
                        <Grid item
                               xs={12}
                               sm={12}
                               
                            lg={5}>


                            <Grid container>
                                <Grid item
                                    xs={12}
                                    sm={12}
                                    >
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                               <Typography component="h2" variant="h4"><b>
                                               About <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>Us</span></b>
          </Typography>

                                    </Paper>
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                            
                                            <Typography component="h2" variant="h6">

                                           We are the team of great people who wants to transform the education in a way that people can make impact the society from the learning given by the learning streak.
                                            </Typography>

                                            
                                            </Paper>
                                    <Paper className={
                                        classes.paper
                                    }
                                        elevation={0}>
                                             <Typography component="h2" variant="h6">
                                            <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>Sales Queries</span>
                                        : sales@examball
                                            <br />
                                            <span style={
                                            {
                                                color:primaryColor
                                            }
                                        }>HR Queries</span>
                                            : hello@examball
                                            </Typography>

                                        </Paper>
                                
                                        <Paper className={
                                classes.paper
                            }
                            elevation={0}>
                            <ul style={
                                {
                                    listStyle: 'none',
                                    textAlign: 'left',
                                    display:'flex',
                                    justifyContent: 'flex-start',
                                    direction:'row',
                                    padding:'5px'
                                   
                                }
                            }>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:primaryColor,

                                            paddingRight:'8px',
                                        }
                                            
                                    }>
                                        <FacebookIcon />
                                    </NavLink>
                                </li>
                                
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:primaryColor,
                                            padding:'8px'
                                        }
                                            
                                    }>
                                        <TwitterIcon />
                                    </NavLink>
                                 
                                </li>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:primaryColor,
                                            padding:'8px'
                                        }
                                            
                                    }>
                                        <   LinkedInIcon />
                                    </NavLink>
                                  
                                </li>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:primaryColor,
                                            padding:'8px'
                                        }
                                            
                                    }>
                                        <  InstagramIcon />
                                    </NavLink>
                                  
                                </li>
                                
                                
                            </ul>
                        </Paper>

                                </Grid>
                              
                            </Grid>

                        </Grid>

                        <Grid item 
                                xs={false}
                                lg={5}
                                className={
                                    classes.image 
                                }/>
                        <Grid item
                            xs={false}
                            lg={1}
                        />

                        
                    </Grid>

                </Container>
            </div>
            <Footer />
            <NavBarBottom />
        </React.Fragment>
    );
}
