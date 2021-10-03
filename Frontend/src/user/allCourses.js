import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { isAutheticated } from "../auth/helper/index";
import FeaturedDashboardContainer from '../user/featuredDashboardContainer'
import SideBarNavBar from './sideBarNavBar';
import CourseCard from '../user/Card'
import {API} from '../backend'
import { Link as RouterLink,Redirect } from "react-router-dom";
import axios from 'axios'
import Skeleton from '@material-ui/lab/Skeleton';

const user = isAutheticated();
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" };
  } else {
    return { color: "#FFFFFF" };
  }
};
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

  
export default function UserDashboard({history}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [value, setValue] = React.useState(0);
    const [courses,setCourses] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const skeletonData = [{},{},{}]

    React.useEffect(() => {
      axios.get(`${API}/courses`)
        .then(results => {
            setCourses(results.data.courses)
            setLoading(false)
        })
    }, []); // <-- Have to pass in [] here!
  return (
    <div className={classes.root}>
   
    <SideBarNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <FeaturedDashboardContainer userData={user} description="All Courses"/>
        <Container fixed >
          <br></br>
          {/* <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
          Explore Our Courses
        </Typography> */}
      
      {
            loading ? ( 
                <Grid container spacing={3} >
                   {  skeletonData.map(obj=>{
                         return (
                            <Grid item xs={12} sm={6} md={3} lg={4} >
                            <Skeleton variant="circle" width={60} height={60} />
                            <Skeleton variant="text"width={290} height={60} />
                            <Skeleton variant="rect" width={290} height={118} />
                            <Skeleton variant="rect" width={290} height={118} />

                            </Grid>
                         )
                     })}
                   
      </Grid>
                      
                      
                    
            ) :(<React.Fragment>
                   <Grid container spacing={3} >
      {courses.map(course=>{
        return (
          <Grid item xs={12} sm={6} md={3} lg={4} >
     
                            <CourseCard courseName={course.name} coursePrice={course.price} courseDesc={course.description} courseRating={4} courseId={course._id} />

 
            </Grid>
        );
    }
      
      )}
  </Grid>
 
  <Box textAlign='center'>
  <Link to="all-courses" style={{textDecoration:'none'}}><Button variant="contained" color="secondary" style={
                                            {
                                                textAlign:'center',
                                                margin:'2px',
                                                color:'#0d1117'
                                            }} >Browse More</Button></Link>
</Box>
            </React.Fragment>)
        }
  
<br></br>
  </Container>
      </main>
    </div>
  );
}



// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         boxShadow: 'none',
//         background: 'transparent',
//     },
//     button:{
//         justifyContent:'center'
//     }
// }));
const performRedirect = () => {
  
      return <Redirect to="/login" />;
  
};


