import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../dashboardListItem';
import Button from '@material-ui/core/Button';
// import Orders from './Orders';
import { signout,isAutheticated } from "../../auth/helper/index";
import CircularProgress from '@material-ui/core/CircularProgress';

import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import ProfileDetailsChangePassword from './ProfileDetailsChangePassword'
import {API} from '../../backend'
import axios from 'axios'
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
  const [open, setOpen] = React.useState(true);
  const [userData,setUserData] = React.useState({})
  const [loading,setLoading] = React.useState(true)
  React.useEffect( () => {
    user = isAutheticated()
    const apiUrl = `${API}/fetchUserDetails/${user.userId}`
    axios.get(apiUrl,
    {
      headers: {
      "Authorization": `Bearer ${user.token}` ,
      "Role":"Student"
    }
      
  }).then(results => {

        setUserData(results.data.user)
        setLoading(false)
      })
  
  }, []);
  const loadingMessage = () => {
    return (
      loading && (
        <CircularProgress />
      )
    );
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
   
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {isAutheticated() && (
        //  <NavLink to="/signout"  style={{ textDecoration: 'none' }}> 
         <Button onClick={() => {
           signout(() => {
             history.push("/");
           });
         }} variant="contained" color="secondary" className={classes.button}>Signout</Button>
        //  </NavLink>
      )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <br />
        {
          loading ? (
            <Box textAlign="center">
                <CircularProgress />
            </Box>
          ):( <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Profile userData={userData}/>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails userData={userData} />
              
            </Grid>
          </Grid>
          <br />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              
              <ProfileDetailsChangePassword />
            </Grid>
          </Grid>
      
        </Container>
       )
        }
       
      </main>
    </div>
  );
}