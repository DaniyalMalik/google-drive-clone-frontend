import React, { useState, useEffect } from 'react';
import basestyle from '../Base.module.css';
import loginstyle from './Login.module.css';
import axios from 'axios';
import { useNavigate, NavLink, useParams } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const { verifyEmailToken } = useParams();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      error.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      error.email = 'Please enter a valid email address';
    }
    if (!values.password) {
      error.password = 'Password is required';
    }

    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();

    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post('http://localhost:5000/api/user/login', user).then((res) => {
        alert(res.data.message);

        localStorage.setItem('token', res.data.token);

        setToken(res.data.token);

        if (res.data.message === 'Verify your email address first!')
          return navigate('/verifyemail', { replace: true });

        navigate('/', { replace: true });
      });
    }
  }, [formErrors]);

  const handleVerifyCode = async () => {
    const res = await axios.post('http://localhost:5000/api/user/verifyemail', {
      resetToken: verifyEmailToken,
    });

    alert(res.data.message);
  };

  useEffect(() => {
    if (verifyEmailToken) handleVerifyCode();
  }, []);

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          onChange={changeHandler}
          value={user.password}
        />
        <NavLink to='/forgotpassword' style={{ float: 'right' }}>
          Forgot Passsword
        </NavLink>
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to='/signup'>Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
