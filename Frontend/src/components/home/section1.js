  
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import homeFeaturedContainerImg from '../../assets/images/section1.svg'

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
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
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    image: {
       
        [theme.breakpoints.down('sm')]: {
            display:'none'
           
          },
          [theme.breakpoints.between('sm','md')]: {
            display:'none'
          
          },
          [theme.breakpoints.between('md','lg')]: {
            backgroundImage: `url(${homeFeaturedContainerImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
         },
          [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${homeFeaturedContainerImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        height: "auto",
           
         }
    }

  }));



export default function FeaturedContainer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
         <Grid container maxWidth='md' spacing={2} justify='space-evenly'>
                <Grid item xs={12}
                                sm={12}
                                md={12}
                                lg={5}>
                <div className={classes.heroContent}>
          <Container >
            <Typography component="h1" variant="h2"  color="textPrimary" gutterBottom>
              Unleash The Learning
            </Typography>
            
            <Typography variant="h6"  color="textSecondary" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit 
            
            </Typography>
            
            <Typography variant="h6"  color="textSecondary" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="flex-start">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Explore Now
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Connect With Us
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
     
                </Grid>
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
              </Grid>
    
      </React.Fragment>
  );
}

