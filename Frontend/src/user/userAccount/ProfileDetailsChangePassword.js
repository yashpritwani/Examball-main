import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { isAutheticated } from "../../auth/helper/index";
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import {API} from '../../backend'
import axios from 'axios'
const user = isAutheticated();


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    currentPassword: '',
     newPassword: '',
     newConfirmPassword:''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const notify = (message) => toast(message);

  function onSubmit(e){

    if(values.newPassword!=values.newConfirmPassword){
      // console.log("Different Password!")
      notify("Different New Password Entered!")

      return ''
    }
    const apiUrl = `${API}/updateUserPassword/${user.userId}`
    axios.post(apiUrl,
      {
        currentPassword: values.currentPassword,
     newPassword: values.newPassword,
     newConfirmPassword:values.newConfirmPassword
      },
    {
      headers: {
      "Authorization": `Bearer ${user.token}` ,
      "Role":"Student"
    }
      
  }).then(results => {
    // console.log(results)

      if(results.data.updated){
        // console.log("Updated!",results.data)
        notify(results.data.message)

        setValues({
          currentPassword: "",
          newPassword: "",
          newConfirmPassword:""
        })
      }else{
        // console.log(results.data)
        notify(results.data.message)

      }
      }).catch(err=>{
        notify(err.response.data.message)
      })
  

}

  return (
    <React.Fragment>
<form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the current password"
                label="Current Password"
                name="currentPassword"
                type="password"

                onChange={handleChange}
                required
                value={values.currentPassword}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"

                onChange={handleChange}
                required
                value={values.newPassword}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                name="newConfirmPassword"
                onChange={handleChange}
                type="password"
                required
                value={values.newConfirmPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={()=>onSubmit()}
          >
            Update Password
          </Button>
        </Box>
      </Card>
    </form>
    <ToastContainer />

    </React.Fragment>
    
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;