import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DisplayContainer from './components/DisplayContainer';
import FileUpload from './components/FileUpload';
import FolderUpload from './components/FolderUpload';
import CreateFolder from './components/CreateFolder';
import Account from './components/Account';
import Shared from './components/Shared';
import Trash from './components/Trash';
import './main.css';
import { useState } from 'react';

function Main({ userstate, setUserState }) {
  const [selector, setSelector] = useState({
    account: false,
    trash: false,
    shared: false,
    files: true,
    uploadFile: false,
    uploadFolder: false,
    createFolder: false,
    folderName: '',
  });

  return (
    <div style={{ width: '95vw' }}>
      {/* {console.log(userstate, 'userstate')} */}
      <Navbar userstate={userstate} setUserState={setUserState} />
      <div id='mainCont'>
        <SideBar
          userstate={userstate}
          selector={selector}
          setSelector={setSelector}
        />
        {selector.files && (
          <DisplayContainer
            userstate={userstate}
            setUserState={setUserState}
            selector={selector}
            setSelector={setSelector}
          />
        )}
        {selector.uploadFile && (
          <FileUpload
            userstate={userstate}
            setUserState={setUserState}
            selector={selector}
            setSelector={setSelector}
          />
        )}
        {selector.uploadFolder && (
          <FolderUpload
            userstate={userstate}
            setUserState={setUserState}
            setSelector={setSelector}
          />
        )}
        {selector.createFolder && <CreateFolder setSelector={setSelector} />}
        {selector.account && (
          <Account userstate={userstate} setUserState={setUserState} />
        )}
        {selector.trash && <Trash setSelector={setSelector} />}
        {selector.shared && <Shared setSelector={setSelector} />}
      </div>
    </div>
  );
}

export default Main;
