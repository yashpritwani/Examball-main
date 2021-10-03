import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: `https://source.unsplash.com/random`,
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Paras Patidar',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 210,
    width: 210
  }
}));

const Profile = ({ props,className, ...rest }) => {
  const classes = useStyles();
  const [userData,setUserData] = React.useState({})
  React.useEffect( () => {
    setUserData(rest.userData)
  
  }, []);
 
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <br />
        <br />
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
                <br />
                <br />

          {/* <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {userData.firstName}
            {" "}
            {userData.lastName}
          </Typography> */}
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography> */}
          
        </Box>
      </CardContent>
      {/* <Divider />
      <br />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;