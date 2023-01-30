import React from 'react';
import icon from '../pics/drive_icon.png';
import search from '../pics/search.png';
import filters from '../pics/filters.png';
import interrogation from '../pics/interrogation.png';
import settings from '../pics/settings.png';
import list from '../pics/list.png';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

export default function Navbar({ setUserState }) {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUserState({});
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              <div id='icon'>
                <img src={icon} alt='Reload page' />
                <p>Drive</p>
              </div>
            </Link>
          </li>
          <li>
            <div id='searchBar'>
              <button>
                <img src={search} alt='Reload page' className='opacity' />
              </button>
              <input type='text' placeholder='Search in Drive' />
              <button>
                <img src={filters} alt='Reload page' className='opacity' />
              </button>
            </div>
          </li>
          <li>
            <div id='navOptions'>
              <button>
                <img
                  src={interrogation}
                  alt='Reload page'
                  className='opacity'
                />
              </button>
              <button>
                <img src={settings} alt='Reload page' className='opacity' />
              </button>
              <button>
                <img src={list} alt='Reload page' className='opacity' />
              </button>
              {/* <button>
                <img src={filters} alt='Reload page' className='opacity' />
              </button> */}
              <IconButton onClick={logout} aria-label='delete'>
                <ExitToApp color='primary' />
              </IconButton>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
