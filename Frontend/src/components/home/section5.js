import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Section5Img from '../../assets/images/section5.svg'
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(-2)
       
    },
    paper: {
       
        
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
      
        textAlign: 'center'
           
          },
          [theme.breakpoints.between('sm','md')]: {
            padding: theme.spacing(2),
        
        textAlign: 'left'
          
          },
          [theme.breakpoints.between('md','lg')]: {
            padding: theme.spacing(2),
      
        textAlign: 'left'
         },
          [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(2),
       
        textAlign: 'left'
           
         }
    },
    image: {
       
        [theme.breakpoints.down('sm')]: {
            display:'none'
           
          },
          [theme.breakpoints.between('sm','md')]: {
            display:'none'
          
          },
          [theme.breakpoints.between('md','lg')]: {
            backgroundImage: `url(${Section5Img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
         },
          [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${Section5Img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
           
         }
    }
}));


export default function ContactUsContainer() {
    const classes = useStyles();
    return (
        <React.Fragment>

            <div className={
                classes.root
            }>
               
                    <Container fixed>
                        <Grid container
                            spacing={3}>
                                <Grid item 
                              
                                lg={1}
                                />

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

                            <Grid item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={5}>


                                <Grid container>
                                    <Grid item
                                        xs={12}>
                                        <Paper className={
                                                classes.paper
                                            }
                                            elevation={0}>
                                            <h1>GET IN TOUCH</h1>

                                        </Paper>
                                        <Paper className={
                                                classes.paper
                                            }
                                            elevation={0}>Please press the button below to contact us directly 
                                                                                                                            and we will get back to you within a day or else you can drop us an email.</Paper>
                                        <Paper className={
                                                classes.paper
                                            }
                                            elevation={0}>
                                            Sales queries: sales@thelearningstreak
                                            <br />
                                            HR queries: hello@thelearningstreak

                                        </Paper>
                                        <Paper className={
                                                classes.paper
                                            }
                                            elevation={0}>
                                            <Button type="submit" variant="contained" color="primary"
                                                className={
                                                    classes.submit
                                            }>
                                                Connect With Us
                                            </Button>
                                            
                                        </Paper>

                                    </Grid>
                                 
                                </Grid>

                            </Grid>
                        </Grid>

                    </Container>
        
            </div>
            <br />
            
        </React.Fragment>
    );
}
