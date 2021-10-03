import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {Redirect } from "react-router-dom";

import Button from '@material-ui/core/Button';
import axios from 'axios'
import history from "../../history";

import {isAutheticated } from "../../auth/helper/index";
import {API,stripe_key} from '../../backend'
import { useParams } from 'react-router';
import { loadStripe } from "@stripe/stripe-js";


let user ;

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

const stripePromise = loadStripe(`${stripe_key}`);


export default function FeaturedContainer(props) {

    const classes = useStyles();
    const {courseId} = useParams()
    // console.log(useParams())
    //console.log("Course Data Props",props.courseData.name)
    const mainFeaturedPost = {
      title: props.courseData.name,
      description:
        props.courseData.description,
      image: 'https://source.unsplash.com/random',
      imgText: 'main image description',
      linkText:  `Explore Now`,
    };
    const [post,setPost] = React.useState(mainFeaturedPost);
  const [userDetails,setUserDetails] = React.useState({});
    const [enrollButton,setEnrollButton] = React.useState("Enroll Course")
  React.useEffect( () => {
    user = isAutheticated()
    const query = new URLSearchParams(window.location.search);
    // console.log(query)

    if (query.get("success") && query.get("sessionId")!=null ) {
      // console.log("Order placed! You will receive an email confirmation.",sessionIdTemp);
    

      axios.post(`${API}/order/success/${courseId}`,{
        userId:user.userId,
        sessionId: query.get("sessionId")
      },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":`Bearer ${user.token}`,
          "Role":"Student"
        }
      })
        .then(async(result) => {
          // localStorage.setItem('paymentSessionId',JSON.stringify({sessionId: session.data.id}))
          
          // localStorage.setItem('paymentSessionId',JSON.stringify({sessionId: session.data.id}))
          console.log("🚀 ~ file: featuredCourseContainer.js ~ line 112 ~ .then ~ result", result)
          setEnrollButton("Enrolled")
        })
        .catch(err=>console.log(err))
    }
    if (query.get("canceled")) {
      // console.log(
      //   "Order canceled -- continue to shop around and checkout when you're ready."
      // );
    }
    const apiUrl = `${API}/fetchUserDetails/${user.userId}`
    axios.get(apiUrl,
    {
      headers: {
      "Authorization": `Bearer ${user.token}` ,
      "Role":"Student"
    }
      
  })
      .then(results => {
        setUserDetails(results.data.user)
      })
  
  }, []);
  const performRedirect = () => {
  
    return <Redirect to="/login" />;

};


  async function enrollCourse(e){
    
    if(user && user.role === 'Student'){
      const stripe =await  stripePromise;

      axios.post(`${API}/create-checkout-session/${courseId}`,{
        userId:user.userId
      },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":`Bearer ${user.token}`,
          "Role":"Student"
        }
      })
        .then(async(session) => {
          // localStorage.setItem('paymentSessionId',JSON.stringify({sessionId: session.data.id}))
          const result = await stripe.redirectToCheckout({
            sessionId: session.data.id,
          });
          // localStorage.setItem('paymentSessionId',JSON.stringify({sessionId: session.data.id}))
          // console.log("🚀 ~ file: featuredCourseContainer.js ~ line 112 ~ .then ~ result", result)
          //setEnrollButton("Enrolled")
          // console.log(result)
        })
        .catch(err=>console.log(err))

    }else{
      // console.log("ERRRRRR")
      history.push( `/signin`);

    }
    

  }
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
              {props.courseData.name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {props.courseData.description}
            </Typography>
     
              
         
              <Button variant="contained" color="secondary"  className={classes.button}>Price: ${props.courseData.price}</Button>

    <br />
    <br />
  
            
            {
              
              Object.keys(userDetails).length !== 0 && userDetails.enrolledCourses.includes(courseId) ?( <Button variant="contained" color="primary"  className={classes.button}>Enrolled</Button>):
            (<Button variant="contained" color="primary" onClick={()=>enrollCourse()} className={classes.button}>{enrollButton}</Button>)

            }
            
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