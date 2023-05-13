import React from 'react';
import icon from '../pics/drive_icon.png';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Typography,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { ExitToApp, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Navbar({ search, setToken, user, setSearch, selector }) {
  const classes = useStyles();
  const [tempSearch, setTempSearch] = React.useState('');

  const logout = () => {
    localStorage.removeItem('token');

    setToken('');
  };

  React.useEffect(() => {
    if (search !== tempSearch) setTempSearch(search);
  }, [search]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <div>
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
          }}>
          <img src={icon} style={{ width: '50px', height: '50px' }} />
          <Typography variant='h4' color='textPrimary'>
            Drive
          </Typography>
        </Link>
      </div>
      {(selector.trash ||
        selector.shared ||
        selector.starred ||
        selector.files) && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setSearch(tempSearch);
          }}>
          <FormControl className={classes.margin} variant='outlined'>
            <InputLabel htmlFor='search'>Search file/folder</InputLabel>
            <OutlinedInput
              id='search'
              name='search'
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton type='submit' edge='end'>
                    {<Search />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              labelWidth={125}
            />
          </FormControl>
        </form>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Typography variant='h6'>
          {user?.firstName && user.firstName + ' ' + user.lastName}
        </Typography>
        <IconButton onClick={logout} aria-label='delete'>
          <ExitToApp />
        </IconButton>
      </div>
    </div>
  );
}
