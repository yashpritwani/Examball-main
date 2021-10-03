import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const mainFeaturedPost = {
  title: 'Unleash The Learning',
  description:
    "Explore 100+ courses and make your learning awesome!",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Explore Now',
};

export default function FeaturedContainer(props) {
  const classes = useStyles();
  const post =mainFeaturedPost;
  return (
    <React.Fragment>
      <div className={classes.root}>
      <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            
            <Button variant="contained" color="primary" className={classes.button}>{post.linkText}</Button>

            {/* <Link variant="subtitle1" href="#">
              
            </Link> */}
          </div>
        </Grid>
      </Grid>
    </Paper>
      </div>
      {/* <Grid container spacing={3} justify="center" style={{backgroundColor:"#121119"}}>
        <Grid item xs={10} sm={9} md={9} lg={9} >
        <HomeTabs />

        </Grid>
      </Grid> */}
      </React.Fragment>
  );
}

FeaturedContainer.propTypes = {
  post: PropTypes.object
};