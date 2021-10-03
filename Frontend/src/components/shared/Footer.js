import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {NavLink} from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"black",
        marginTop:theme.spacing(2),
        position: 'relative',
        width:'100%',
bottom:0
        
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor:"black",
        color:"white"
    }
}));

export default function SimpleContainer() {
    const classes = useStyles();
    return (
        <React.Fragment>
           
            <div className={
                classes.root
            }>
                 <WhiteTextTypography >
                <Container fixed>
                
                    <Grid container
                    spacing={3}>
                    <Grid item
                        xs={6}
                        sm={3}>
                        <Paper className={
                                classes.paper
                            }
                            elevation={0}>
                            {/* <NavLink to="/">
                                <img src={homeLogo}
                                    alt="homeLogo"
                                    width="150px"
                                    height="60px"/>
                            </NavLink> */}
                        </Paper>
                    </Grid>
                    <Grid item
                        xs={6}
                        sm={3}>
                        <Paper className={
                                classes.paper
                            }
                            elevation={0}
                            
                            >
                            <ul style={
                                {
                                    listStyle: 'none',
                                    textAlign: 'left',
                                   
                                }
                            }>
                                <li>
                                    <NavLink to="/contact-us"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about-us"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        About Us
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        Articles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/courses"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        Courses
                                    </NavLink>
                                </li>
                            </ul>

                        </Paper>
                    </Grid>
                    <Grid item
                        xs={6}
                        sm={3}>
                        <Paper className={
                                classes.paper
                            }
                            elevation={0}>
                            <ul style={
                                {
                                    listStyle: 'none',
                                    textAlign: 'left'
                                }
                            }>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        Try For Free
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" 
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        Login
                                    </NavLink>
                                </li>
                            </ul>

                        </Paper>
                    </Grid>
                    <Grid item
                        xs={6}
                        sm={3}>
                        <Paper className={
                                classes.paper
                            }
                            elevation={0}>
                            <b>Connect With Us</b>
                            <ul style={
                                {
                                    listStyle: 'none',
                                    textAlign: 'left',
                                    display:'flex',
                                    justifyContent: 'space-evenly',
                                    direction:'row',
                                   
                                }
                            }>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        <FacebookIcon />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        <TwitterIcon />
                                    </NavLink>
                                 
                                </li>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        <   LinkedInIcon />
                                    </NavLink>
                                  
                                </li>
                                <li>
                                    <NavLink to="/register"
                                        style={
                                            {textDecoration: 'none',
                                            color:'white'
                                        }
                                            
                                    }>
                                        <  InstagramIcon />
                                    </NavLink>
                                  
                                </li>
                                
                                
                            </ul>
                        </Paper>
                    </Grid>
                </Grid>

                </Container>
                </WhiteTextTypography>                
            </div>
        </React.Fragment>
    );
}
