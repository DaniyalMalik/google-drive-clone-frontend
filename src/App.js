import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/GUI/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
                <Main setUserState={setUserState} username={userstate.fname} />
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
            }></Route>
          {!userstate && (
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
                }></Route>
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
                }></Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
