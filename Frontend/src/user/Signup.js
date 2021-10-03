import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOpen from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RegisterSVG from '../assets/images/register.svg'
import NavBarTop from '../core/Menu'
import { NavLink } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import NavBarBottom from '../components/shared/NavBarBottom'
import { signup } from "../auth/helper";
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
    height: "auto",
    marginTop:theme.spacing(-8)
  },
  image: {
    backgroundImage: `url(${RegisterSVG})`,
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
    backgroundColor:'transparent',
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
}));
const Signup = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { firstName,lastName, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const customId = "custom-id-yes";

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstName,lastName, email, password })
      .then(data => {
        // console.log(data)
        if (data.message) {
          setValues({ ...values, error: data.message, success: false });
        } else {
          setValues({
            ...values,
            fistname: "",
            lastName:"",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <React.Fragment>
      <NavBarTop />

  <Grid container component="main" className={classes.root}>
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              onChange={handleChange("firstName")}
              value={firstName}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              onChange={handleChange("lastName")}
              value={lastName}

            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          {
              /* 
              <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
              */
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item md>
              <NavLink to="/signin" style={{ textDecoration: 'none' }}>
                 <Button size="small" color="primary" >
                 Have an account? Sign In
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
  <Footer />
  <NavBarBottom />
  </React.Fragment>
    );
  };

  const successMessage = () => {
    toast("Account was created successfully, Please Login!", {
      toastId: customId
    });
    
  }

  const errorMessage = () => {
    toast(error, {
      toastId: customId
    });
 
  
  };

  return (
    <React.Fragment>
      {success && successMessage() }
      {error && errorMessage() }
      {signUpForm()}
      <ToastContainer />
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </React.Fragment>
  );
};

export default Signup;
