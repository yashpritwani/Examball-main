import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { isAutheticated } from "../auth/helper/index";
import FeaturedDashboardContainer from '../user/featuredDashboardContainer'
import SideBarNavBar from './sideBarNavBar';
import {API} from '../backend'
import { Link  } from "react-router-dom";
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';

let user;
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
    const [attemptedTest,setAttemptedTest] = React.useState([])
    const [loading,setLoading] = React.useState(true)

    React.useEffect(() => {
      user = isAutheticated()
const apiurl = `${API}/getOverallAttemptedTest/${user.userId}`
      axios.get(`${API}/getOverallAttemptedTest/${user.userId}`,
          {
            headers: {
            "Authorization": `Bearer ${user.token}` ,
            "Role":"Student"
          }
            
        })
            .then(results => {
              
              setAttemptedTest(results.data.attemptedTest)
              setLoading(false)

            }).catch(err=>console.log(err))
    }, []); // <-- Have to pass in [] here!
  return (
    <div className={classes.root}>
   
    <SideBarNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <FeaturedDashboardContainer userData={user} description="Check Your Results!"/>
        <Container fixed >
          <br></br>
          {/* <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
          Explore Our Courses
        </Typography> */}
      
      <Paper elevation={2} className={classes.paper}>
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
                      
               
          ):(
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell >End Time</TableCell>
            <TableCell >Total Questions</TableCell>
            <TableCell >Score</TableCell>
            <TableCell >Accuracy</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {attemptedTest.map((row) => (
              row.endTime ? (
              <TableRow key={row.testSessionId}>
                <TableCell >
                  {row.startTime}
                </TableCell>
                <TableCell >{row.endTime}</TableCell>
                <TableCell >{row.totalQuestions}</TableCell>
                <TableCell >{row.totalScore}</TableCell>
                <TableCell >{row.percentage}%</TableCell>
                 <TableCell align="right">
                 <Link to={`/user/test/${row.testId}/exam/session/${row.testSessionId}/result`} style={{textDecoration:'none'}}><Button variant="contained" color="primary" style={
                                              {
                                                  textAlign:'right'
                                              }} >View</Button></Link>
                 </TableCell>
  
              </TableRow>
              ):(<React.Fragment></React.Fragment>)
           ))}
          </TableBody>
       
      
      </Table>
    </TableContainer>
         )
        }
        </Paper>
       
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


