import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {useParams} from 'react-router-dom'
import FeaturedCourseContainer from '../components/courses/featuredCourseContainer'
import TestList from '../user/testList'
import { isAutheticated } from "../auth/helper/index";
import SideBarNavBar from './sideBarNavBar';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios'
import {API} from '../backend'
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


export default function SpecificCourse(props) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const courseParam = props.match.params.course
  const  {courseId} = useParams()
  // console.log("🚀 ~ file: specificCourse.js ~ line 2935 ~ SpecificCourse ~  courseId",  courseId)
  const [course,setCourse] = React.useState([])
  const [test,setTest] = React.useState([])
  const [loading,setLoading] = React.useState(true)

  React.useEffect(() => {
      axios.get(`${API}/getCourseInfo/${courseId}`)
      .then(results => {
        // console.log(results.data.course)
        setCourse(results.data.course)})
    axios.get(`${API}/tests/${courseId}`)
      .then(results => {
        setTest(results.data.tests)
        setLoading(false)
    })
  }, []); // <-- Have to pass in [] here!
  return (
    <div className={classes.root}>
      <SideBarNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <FeaturedCourseContainer courseData={course}/>
        {
            loading ? ( 
                <Grid container spacing={3} >
                   
                             <React.Fragment>
                             <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8} >
                           
                            <Skeleton variant="text"width={"100%"} height={60} />
                          
                            <Skeleton variant="rect" width={"50%"} height={60} />
                            <Skeleton variant="text"width={"100%"} height={60} />

                            </Grid>
                         <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                         </React.Fragment>
                         )
                     
                   
      </Grid>
                      
                      
                    
            ) :(<React.Fragment>
                 <TestList testData={test}/>
            </React.Fragment>)
}
      </main>
    </div>
  );
}




