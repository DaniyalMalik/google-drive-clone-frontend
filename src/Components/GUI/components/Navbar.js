import React from 'react';
import icon from '../pics/drive_icon.png';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

export default function Navbar({ setToken, user }) {
  const logout = () => {
    localStorage.removeItem('token');

    setToken('');
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
          <Typography variant='h4' color='textPrimary'>
            Drive
          </Typography>
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
          {user?.firstName && user.firstName + ' ' + user.lastName}
        </Typography>
        <IconButton onClick={logout} aria-label='delete'>
          <ExitToApp />
        </IconButton>
      </div>
    </div>
  );
}
