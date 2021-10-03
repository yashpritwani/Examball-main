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
    firstName: rest.userData.firstName,
    lastName: rest.userData.lastName,
    email: rest.userData.email,
    phone: ''
  });

  const notify = (message) => toast(message);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function onSubmit(e){

      const apiUrl = `${API}/updateUserDetails/${user.userId}`
      axios.post(apiUrl,
        {
          firstName:values.firstName,
          lastName:values.lastName,
          email:values.email
        },
      {
        headers: {
        "Authorization": `Bearer ${user.token}` ,
        "Role":"Student"
      }
        
    }).then(results => {
        if(results.data.updated){
          // console.log("Updated!",results.data)
          notify(results.data.message)
          setValues({
            firstName:results.data.userData.firstName,
            lastName:results.data.userData.lastName,
            email:results.data.userData.email

          })
        }else{
          // console.log(results.data)
          notify(results.data.message)

        }
        }).catch(err=>console.log(err))
    
 
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
          title="Profile"
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
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
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
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
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
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
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
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
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
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
         */}
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
            Save details
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