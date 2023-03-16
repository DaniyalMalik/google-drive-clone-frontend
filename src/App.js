import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/GUI/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/Resetpassword/ResetPassword';

function App() {
  const [userstate, setUserState] = useState(
    localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : {},
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              userstate && userstate._id ? (
                <Main userstate={userstate} setUserState={setUserState} />
              ) : (
                <div
                  style={{
                    height: '100vh',
                    alignItems: 'center',
                    display: 'flex',
                  }}>
                  <Login setUserState={setUserState} />
                </div>
              )
            }
          />
          {!userstate?._id && (
            <>
              <Route
                path='/login'
                element={
                  <div
                    style={{
                      height: '100vh',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Login setUserState={setUserState} />
                  </div>
                }
              />
              <Route
                path='/signup'
                element={
                  <div
                    style={{
                      height: '100vh',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Register />
                  </div>
                }
              />
              <Route
                path='/forgotpassword'
                element={
                  <div
                    style={{
                      height: '100vh',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <ForgotPassword />
                  </div>
                }
              />
              <Route
                path='/resetpassword/:token'
                element={
                  <div
                    style={{
                      height: '100vh',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <ResetPassword />
                  </div>
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
