import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginSVG from '../assets/images/login.svg'
import NavBarTop from '../core/Menu'
import { NavLink } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import NavBarBottom from '../components/shared/NavBarBottom'
import { signin, authenticate, isAutheticated } from "../auth/helper";
import CircularProgress from '@material-ui/core/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import {API} from '../backend'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        -
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginTop:theme.spacing(-8)
  },
  image: {
    backgroundImage: `url(${LoginSVG})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:'transparent',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  display: 'flex',
  '& > * + *': {
    marginLeft: theme.spacing(2),
  },
}));

function Signin(){
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "abc@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(forgotEmailValue)
    axios.post(`${API}/forgotPasswordRequest`,{email:forgotEmailValue})
    .then(response=>{
      // console.log(response.data)
      setOpen(false);

    }).catch(err=>console.log(err))
  };

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const [forgotEmailValue,setForgotEmailValue] = React.useState('')


  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        // console.log(data)
        if (data.message) {
          setValues({ ...values, error: data.message, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };
  const customId = "custom-id-yes";
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <CircularProgress />
      )
    );
  };

  const errorMessage = () => {
    toast(error, {
      toastId: customId
    });
 
  
  };

  const signInForm = () => {
    
    return (
      <React.Fragment>
          <NavBarTop />
    
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange("email")}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange("password")}
                value={password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              {loading ? (
                <div style={{textAlign:"center"}}>
               <CircularProgress />

                </div>
             
        
      ):(<Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
      >
        Sign In
      </Button>)}
            
           
            <Grid container>
              <Grid item xs>
              {/* <NavLink to="/signup" style={{ textDecoration: 'none' }}>
              Forgot password?
                </NavLink> */}
                <Button size="small" color="primary"  onClick={handleClickOpen}>
                Forgot password?
      </Button>
              </Grid>
              <Grid item>
                <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                <Button size="small" color="primary" >
                Don't Have An Account?
      </Button>
                </NavLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Forgot Password ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If Email Exist On Our Server's, We will get this done...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            type="email"
            onChange={(e)=>setForgotEmailValue(e.target.value)}
            value={forgotEmailValue}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Send Request
          </Button> */}
           <Button onClick={handleClose} color="primary">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    <Footer />
    <NavBarBottom />
    </React.Fragment>
    );
  };

  return (
  <React.Fragment>
      {/* {loadingMessage()} */}
      {error && errorMessage() }
      {signInForm()}
      {performRedirect()}
      <ToastContainer  />
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
  </React.Fragment>
    
  );
};

export default Signin;
