  
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Section2Img from '../../assets/images/section2.svg'

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:'grey'
    },
    icon: {
      
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
    // backgroundImage: `url(${homeFeaturedContainerImg})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundColor: 'transparent',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // height: "auto",
      padding: theme.spacing(8, 0, 6),
      marginBottom:theme.spacing(4)
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    image: {
       
        [theme.breakpoints.down('sm')]: {
            display:'none',
            
           
          },
          [theme.breakpoints.between('sm','md')]: {
            display:'none'
          
          },
          [theme.breakpoints.between('md','lg')]: {
            backgroundImage: `url(${Section2Img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
         },
          [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${Section2Img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
           
         }
    }

  }));



export default function Section2(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
         <Grid container maxWidth='md' spacing={2} justify='space-evenly'>
         <Grid item 
                                xs={false}
                                md={5}
                                lg={5}
                                style={{
                                    margin:'10px'
                                }}
                                className={
                                    classes.image 
                                }/>
                <Grid item xs={12}
                                sm={12}
                                md={12}
                                lg={5}>
                <div className={classes.heroContent}>
          <Container fixed >
            <Typography component="h3" variant="h3"  color="textPrimary" gutterBottom>
            Learn & Get Certified 
            </Typography>
            <Typography component="h4" variant="h4"  color="textPrimary" gutterBottom>
            From This Companies
            </Typography>

            <div className={classes.heroButtons}>
              <Grid container maxWidth='lg' spacing={2} justify="flex-start">
                {/* <Grid item>
                  <Button variant="contained" color="primary">
                    Explore Now
                  </Button>
                </Grid> */}
              
               
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "blue",
        borderColor:"blue"
    }}>
                   Google Cloud Platform
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "orange",
        borderColor:"orange"
    }}>
                  Amazon Web Services
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "purple",
        borderColor:"purple"
    }}>
                  Azure
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "red",
        borderColor:"red"
    }}>
                  Salesforce
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "green",
        borderColor:"green"
    }}>
                  Amazon Web Services
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "magenta",
        borderColor:"magenta"
    }}>
                  Alibaba Cloud
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined"  style={{
        color: "orange",
        borderColor:"orange"
    }}>
                  TensorFlow
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
     
                </Grid>
              
              </Grid>
              <br />
    
      </React.Fragment>
  );
}

