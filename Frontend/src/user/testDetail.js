import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, useParams } from "react-router-dom";
import SideBarNavBar from './sideBarNavBar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CreateIcon from '@material-ui/icons/Create';
import TimerIcon from '@material-ui/icons/Timer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { isAutheticated } from "../auth/helper/index";
import {API} from '../backend'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import history from "../history";

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
    table: {
      minWidth: 650,
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
  function createData(startTime, endTime, totalQuestions, totalScore, percentage) {
    return { startTime, endTime, totalQuestions, totalScore, percentage };
  }
  
export default function TestDetail(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [testDetail,setTestDetail] = React.useState({})
    const [attemptedTest,setAttemptedTest] = React.useState([])
    const {id:testId} = useParams()
    const [loading,setLoading] = React.useState(true)

    // console.log("🚀 ~ file: testDetail.js ~ line 133 ~ TestDetail ~ testId", testId)
    React.useEffect(() => {
      const apiUrl = `${API}/getTestInfo/${testId}`
      axios.get(apiUrl,
      {
        headers: {
        "Authorization": `Bearer ${user.token}` ,
        "Role":"Student"
      }
        
    })
        .then(results => {
        //  console.log(results.data.test.question.length)
          setTestDetail(results.data.test)
        }).catch(err=>console.log(err))
        axios.post(`${API}/getAllResults/${testId}`,{userId:user.userId},
          {
            headers: {
            "Authorization": `Bearer ${user.token}` ,
            "Role":"Student"
          }
            
        })
            .then(results => {
            //  console.log(results.data.attemptedTest)
              setAttemptedTest(results.data.attemptedTest)
              setLoading(false)
            }).catch(err=>console.log(err))
    }, []);
    function startTest(){
      const apiUrl = `${API}/startTest/${testId}`
      axios.post(apiUrl,{userId:user.userId},
      {
        headers: {
        "Authorization": `Bearer ${user.token}` ,
        "Role":"Student"
      }
        
    })
        .then(results => {
          if(results.data.startTest){
            localStorage.setItem('testSessionId',results.data.testSessionId)
            const testObj = {
              testStartTime:results.data.startTime,
              testSessionId:results.data.testSessionId,
              testTotalTime:Object.keys(testDetail).length!==0 && testDetail.time
                        }
            localStorage.setItem('testObj',JSON.stringify(testObj))
            history.push( `/user/test/${testId}/exam/start`);


          }
          // console.log(results.data)
        }).catch(err=>console.log(err))
    }
    
    return (
        <div className={classes.root}>
      <SideBarNavBar />
            <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Paper elevation={2} className={classes.paper}>
            <div className={classes.examHeader}>
            <Typography component="h4" variant="h4" color="textPrimary" gutterBottom>
         {testDetail.name}
        </Typography>
        <Button variant="contained" color="primary" style={
                                            {
                                                textAlign:'right'
                                            }} onClick={()=>startTest()}>Start Exam</Button>
            </div>
        
        </Paper>
        <Paper elevation={2} className={classes.paper}>
        <Typography component="h5" variant="h4" align="center" color="textPrimary" gutterBottom>
         Exam Details
        </Typography>
        <Grid container>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
          <Grid container alignContent="space-between" alignItems="center">
                   
                    <Grid item>
                    <CreateIcon color="primary" fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Questions: {Object.keys(testDetail).length!==0 && testDetail.question.length}</Typography>
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
                       <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Time: {Object.keys(testDetail).length!==0 && testDetail.time} Mins</Typography>
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
                       <Typography style={{paddingLeft:'10px'}} inline component="h6" variant="h6" gutterBottom>Max. Marks: {Object.keys(testDetail).length!==0 && testDetail.question.length}</Typography>
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
                       <Typography style={{paddingLeft:'14px'}} inline component="h6" variant="h6" gutterBottom>Passing : 75%</Typography>
                   </Grid>
               </Grid>

          </Paper>
        </Grid>
      </Grid>

        </Paper>
        <Paper elevation={2} className={classes.paper}>
        <Typography component="h5" variant="h4" align="center" color="textPrimary" gutterBottom>
         Exam Instructions
        </Typography>
       <Container>
       <Typography variant="body1" gutterBottom>
        1. Do Not Cheat
      </Typography>
      <Typography variant="body1" gutterBottom>
        2. Do Not Copy Content From Other Website
      </Typography>
      <Typography variant="body1" gutterBottom>
        3. Do Not Copy Content From Other Website
      </Typography>
      <Typography variant="body1" gutterBottom>
        4. Do Not Copy Content From Other Website
      </Typography>
      <Typography variant="body1" gutterBottom>
        5. Do Not Copy Content From Other Website
      </Typography>

       </Container>
        </Paper>
        <Paper elevation={2} className={classes.paper}>
        <Typography component="h5" variant="h4" align="center" color="textPrimary" gutterBottom>
         Previous Attempts
        </Typography>
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
               <Link to={`/user/test/${testId}/exam/session/${row.testSessionId}/result`} style={{textDecoration:'none'}}><Button variant="contained" color="primary" style={
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
          )}
        </Paper>
       
        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
        {/* <Box textAlign='center'>
  <Link to="all-courses" style={{textDecoration:'none'}}><Button variant="contained" color="primary" style={
                                            {
                                                textAlign:'center',
                                                margin:'2px'
                                            }} >Start Exam</Button></Link>
</Box> */}
      </main>
    </div>
    )
}