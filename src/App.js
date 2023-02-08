import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/GUI/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userstate, setUserState] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {},
  );

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              userstate && userstate._id ? (
                <Main setUserState={setUserState} username={userstate.fname} />
              ) : (
                <Login setUserState={setUserState} />
              )
            }></Route>
          <Route
            path='/login'
            element={<Login setUserState={setUserState} />}></Route>
          <Route path='/signup' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
