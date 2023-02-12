import React from 'react';
import icon from '../pics/drive_icon.png';
// import search from '../pics/search.png';
// import filters from '../pics/filters.png';
// import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

export default function Navbar({ setUserState }) {
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUserState({});
  };

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
          <Typography variant='h3'>Drive</Typography>
        </Link>
      </div>
      {/* <li>
          <div id='searchBar'>
            <button>
              <img src={search} alt='Reload page' className='opacity' />
            </button>
            <input type='text' placeholder='Search in Drive' />
            <button>
              <img src={filters} alt='Reload page' className='opacity' />
            </button>
          </div>
        </li> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Typography variant='h6'>
          {user.firstName + ' ' + user.lastName}
        </Typography>
        <IconButton onClick={logout} aria-label='delete'>
          <ExitToApp />
        </IconButton>
      </div>
    </div>
  );
}
