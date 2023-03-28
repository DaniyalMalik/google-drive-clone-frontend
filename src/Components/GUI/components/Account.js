import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Button,
  TextField,
  Box,
  Typography,
  Tab,
} from '@material-ui/core';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Account({ setUpdated }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [changePassword, setChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const getUser = async () => {
    const res = await axios.get('http://localhost:5000/api/user', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setUser(res.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (changePassword.newPassword !== changePassword.repeatNewPassword) {
      alert('New passwords not matched!');
    }

    const res = await axios.put(
      'http://localhost:5000/api/user/updatepassword/' + user._id,
      { ...changePassword },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success)
      setChangePassword({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      'http://localhost:5000/api/user/' + user._id,
      { ...user },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      getUser();

      setUpdated(true);
    }
  };

  // const handleEmailVerification = async (e) => {
  //   e.preventDefault();

  //   const res = await axios.get(
  //     'http://localhost:5000/api/user/sendverifyemail/?email=' + user.email,
  //     {
  //       headers: {
  //         'x-auth-token': localStorage.getItem('token'),
  //       },
  //     },
  //   );

  //   alert(res.data.message);

  //   if (res.data.success) handleChange(null, 2);
  // };

  // const handleVerifyCode = async (e) => {
  //   e.preventDefault();

  //   const res = await axios.post(
  //     'http://localhost:5000/api/user/verifyemail/',
  //     { resetToken: e.target.verificationCode.value },
  //     {
  //       headers: {
  //         'x-auth-token': localStorage.getItem('token'),
  //       },
  //     },
  //   );

  //   alert(res.data.message);

  //   if (res.data.success) {
  //     localStorage.setItem('user', JSON.stringify(res.data.user));

  //     handleChange(null, 0);

  //     setUserState({ ...res.data.user });
  //   }
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onPasswordsChange = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
  };

  const onProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div id='displayCont'>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            variant='fullWidth'
            value={value}
            onChange={handleChange}
            aria-label='nav tabs example'>
            <LinkTab label='Profile' {...a11yProps(0)} />
            <LinkTab label='Change Password' {...a11yProps(1)} />
            {/* {!user?.isEmailVerified && (
              <LinkTab label='Verify Email' {...a11yProps(2)} />
            )} */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div id='contentDisplayer'>
            <form noValidate autoComplete='off' onSubmit={handleProfileSubmit}>
              <TextField
                label='Email'
                style={{ margin: '10px' }}
                variant='outlined'
                onChange={onProfileChange}
                name='email'
                value={user?.email}
                disabled
              />
              {/* <Button
                variant='contained'
                disabled={user?.isEmailVerified}
                onClick={handleEmailVerification}
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                size='small'>
                Verify Email
              </Button> */}
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                label='First Name'
                variant='outlined'
                name='firstName'
                id='firstName'
                value={user?.firstName}
              />
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                label='Last Name'
                variant='outlined'
                name='lastName'
                id='lastName'
                value={user?.lastName}
              />
              <br />
              <Button
                style={{ margin: '10px' }}
                variant='contained'
                type='submit'
                size='small'>
                Update Profile
              </Button>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div id='contentDisplayer'>
            <form autoComplete='off' onSubmit={handlePasswordSubmit}>
              <TextField
                label='Old Password'
                style={{ margin: '10px' }}
                variant='outlined'
                onChange={onPasswordsChange}
                name='oldPassword'
                required
                value={changePassword.oldPassword}
              />
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onPasswordsChange}
                label='New Password'
                required
                variant='outlined'
                name='newPassword'
                value={changePassword.newPassword}
              />
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onPasswordsChange}
                label='Repeat New Password'
                variant='outlined'
                required
                name='repeatNewPassword'
                value={changePassword.repeatNewPassword}
              />
              <br />
              <Button
                style={{ margin: '10px' }}
                type='submit'
                variant='contained'
                size='small'>
                Update Password
              </Button>
            </form>
          </div>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <div id='contentDisplayer'>
            <form autoComplete='off' onSubmit={handleVerifyCode}>
              <TextField
                label='Email verification code'
                style={{ margin: '10px' }}
                variant='outlined'
                name='verificationCode'
                required
              />
              <br />
              <Button
                style={{ margin: '10px' }}
                type='submit'
                variant='contained'
                size='small'>
                Verify
              </Button>
            </form>
          </div>
        </TabPanel> */}
      </div>
    </div>
  );
}
