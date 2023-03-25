import React, { useState, useEffect } from 'react';
import basestyle from '../Base.module.css';
import loginstyle from './SendVerifyEmail.module.css';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const SendVerifyEmail = () => {
  const navigate = useNavigate();

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      'http://localhost:5000/api/user/sendverifyemail/?email=' +
        e.target.email.value,
    );

    alert(res.data.message);

    if (res.data.success) navigate('/login', { replace: true });
  };

  return (
    <div className={loginstyle.login}>
      <form onSubmit={handleEmailVerification}>
        <h1>Send Verification Email</h1>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email'
          required
        />
        <NavLink to='/' style={{ float: 'right' }}>
          Back to login
        </NavLink>
        <button className={basestyle.button_common} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendVerifyEmail;
