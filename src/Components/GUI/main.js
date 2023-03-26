import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DisplayContainer from './components/DisplayContainer';
import FileUpload from './components/FileUpload';
import axios from 'axios';
import FolderUpload from './components/FolderUpload';
import CreateFolder from './components/CreateFolder';
import Account from './components/Account';
import Shared from './components/Shared';
import Trash from './components/Trash';
import './main.css';
import React from 'react';

function Main({ setToken }) {
  const [selector, setSelector] = React.useState({
    account: false,
    trash: false,
    shared: false,
    files: true,
    uploadFile: false,
    uploadFolder: false,
    createFolder: false,
    folderName: '',
  });
  const [user, setUser] = React.useState({});
  const [updated, setUpdated] = React.useState(true);

  const getUser = async () => {
    const res = await axios.get('http://localhost:5000/api/user', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setUser(res.data.user);
    setUpdated(false);
  };

  React.useEffect(() => {
    if (updated) getUser();
  }, [updated]);

  return (
    <div style={{ width: '95vw' }}>
      <Navbar
        user={user}
        setToken={setToken}
        selector={selector}
        setSelector={setSelector}
      />
      <div id='mainCont'>
        <SideBar selector={selector} setSelector={setSelector} />
        {selector.files && (
          <DisplayContainer selector={selector} setSelector={setSelector} />
        )}
        {selector.uploadFile && (
          <FileUpload selector={selector} setSelector={setSelector} />
        )}
        {selector.uploadFolder && (
          <FolderUpload selector={selector} setSelector={setSelector} />
        )}
        {selector.createFolder && (
          <CreateFolder selector={selector} setSelector={setSelector} />
        )}
        {selector.account && (
          <Account
            setUpdated={setUpdated}
            selector={selector}
            setSelector={setSelector}
          />
        )}
        {selector.trash && (
          <Trash selector={selector} setSelector={setSelector} />
        )}
        {selector.shared && (
          <Shared selector={selector} setSelector={setSelector} />
        )}
      </div>
    </div>
  );
}

export default Main;
