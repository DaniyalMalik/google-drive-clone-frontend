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

export default function Account({ setUserState }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [changePassword, setChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [account, setProfile] = useState();

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (changePassword.newPassword !== changePassword.repeatNewPassword) {
      alert('New passwords not matched!');
    }

    const res = await axios.put(
      'http://localhost:5000/api/user/updatepassword/' + account._id,
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
      'http://localhost:5000/api/user/' + account._id,
      { ...account },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setUserState({ ...res.data.user });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onPasswordsChange = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
  };

  const onProfileChange = (e) => {
    setProfile({ ...account, [e.target.name]: e.target.value });
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
            <LinkTab label='Profile' href='/drafts' {...a11yProps(0)} />
            <LinkTab label='Change Password' href='/trash' {...a11yProps(1)} />
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
                value={account?.email}
                disabled
              />
              <Button
                variant='contained'
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                size='small'
                disabled>
                {/* disabled={account?.isEmailVerified}> */}
                Verify Email
              </Button>
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                label='Name'
                variant='outlined'
                name='firstName'
                value={account?.firstName}
              />
              <br />
              <TextField
                style={{ margin: '10px' }}
                onChange={onProfileChange}
                label='Name'
                variant='outlined'
                name='lastName'
                value={account?.lastName}
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
      </div>
    </div>
  );
}
