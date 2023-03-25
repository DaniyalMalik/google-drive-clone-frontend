import React from 'react';
import basestyle from '../Base.module.css';
import loginstyle from './ResetPassword.module.css';
import axios from 'axios';
import { useNavigate, NavLink, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();

  const resetPasswordHandler = (e) => {
    e.preventDefault();

    if (!resetPasswordToken) {
      alert('Token is required!');
    }

    if (e.target.password.value !== e.target.repeatPassword.value) {
      alert('Passwords do not match!');
    }

    axios
      .post('http://localhost:5000/api/user/resetpassword', {
        password: e.target.password.value,
        resetToken: resetPasswordToken,
      })
      .then((res) => {
        alert(res.data.message);

        if (res.data.success) navigate('/', { replace: true });
      });
  };

  return (
    <div className={loginstyle.login}>
      <form onSubmit={resetPasswordHandler}>
        <h1>ResetPassword</h1>
        <input
          type='text'
          name='password'
          id='password'
          placeholder='Enter password'
          required
        />
        <input
          type='text'
          name='repeatPassword'
          id='repeatPassword'
          required
          placeholder='Repeat password'
        />
        <NavLink to='/' style={{ float: 'right' }}>
          Back to login
        </NavLink>
        <button className={basestyle.button_common} type='submit'>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
