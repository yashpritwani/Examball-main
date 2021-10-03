import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, useParams } from "react-router-dom";
import SideBarNavBar from '../../sideBarNavBar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CreateIcon from '@material-ui/icons/Create';
import TimerIcon from '@material-ui/icons/Timer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import {isAutheticated } from "../../../auth/helper/index";
import {API} from '../../../backend'
import Score from "react-score-indicator";

import axios from 'axios'

const user = isAutheticated();

const columns = [
  { field: 'number', headerName: 'Question No.', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

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
      flexGrow: 1,
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
      margin: theme.spacing(2),
    },
    fixedHeight: {
      height: 240,
    },
    examHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
  }));

  
export default function Result(props){
    const classes = useStyles();
    const {id,sessionId} = useParams()
    // console.log("Id:",id)
    // console.log("SessionId:",sessionId)
    const [testResult,setTestResult] = React.useState({})


    React.useEffect(()=>{

      axios.post(`${API}/getOneResult/${id}/${sessionId}`,{
        userId:user.userId
      },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":`Bearer ${user.token}`,
          "Role":"Student"
        }
      })
        .then(result => {
          // console.log(result.data.attemptedTest.attemptedTest[0])
          localStorage.removeItem('testObj')

          setTestResult(result.data.attemptedTest.attemptedTest[0])
        })
        .catch(err=>console.log(err))

    },[])

  
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
      <SideBarNavBar />
            <main className={classes.content}>
        <div className={classes.appBarSpacer} />
       <br />
       <br />
       <Paper>
       <Score
            value={testResult.totalScore}
            maxValue={testResult.totalQuestions}
            borderWidth={30}
            gap={5}
            maxAngle={260}
            rotation={90}
            colors={[
              "#d12000",
              "#ed8d00",
              "#f1bc00",
              "#84c42b",
              "#53b83a",
              "#3da940",
              "#3da940",
              "#3da940"
            ]}
          />

       </Paper>
       <Paper>
       <Grid container>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
          <Grid container alignContent="space-between" alignItems="center">
                   
                    <Grid item>
                    <CreateIcon color="primary" fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Questions: {Object.keys(testResult).length!==0 && testResult.totalQuestions}</Typography>
                    </Grid>
                </Grid>
             
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
          <Grid container alignContent="space-between" alignItems="center">
                   
                   <Grid item>
                   <TimerIcon color="primary" fontSize="large" />
                   </Grid>
                   <Grid item>
                       <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Total Score: {Object.keys(testResult).length!==0 && testResult.totalScore} </Typography>
                   </Grid>
               </Grid>

          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
          <Grid container alignContent="space-between" alignItems="center">
                   
                   <Grid item>
                   <PlaylistAddCheckIcon color="primary" fontSize="large" />
                   </Grid>
                   <Grid item>
                       <Typography style={{paddingLeft:'10px'}} inline component="h6" variant="h6" gutterBottom>Max. Marks: {Object.keys(testResult).length!==0 && testResult.totalQuestions}</Typography>
                   </Grid>
               </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
          <Grid container alignContent="space-between" alignItems="center">
                   
                   <Grid item>
                   <TrackChangesIcon color="primary" fontSize="large" />
                   </Grid>
                   <Grid item>
                       <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Accuracy: {Object.keys(testResult).length!==0 && testResult.percentage}%</Typography>
                   </Grid>
               </Grid>

          </Paper>
        </Grid>
      </Grid>
         
       </Paper>
      </main>
    </div>
    )
}