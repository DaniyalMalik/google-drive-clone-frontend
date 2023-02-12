import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DisplayContainer from './components/DisplayContainer';
import FileUpload from './components/FileUpload';
import FolderUpload from './components/FolderUpload';
import CreateFolder from './components/CreateFolder';
import './main.css';
import { useState } from 'react';

function Main({ setUserState }) {
  const [selector, setSelector] = useState({
    files: true,
    uploadFile: false,
    uploadFolder: false,
    createFolder: false,
  });

  return (
    <div style={{ width: '95vw' }}>
      <Navbar setUserState={setUserState} />
      <div id='mainCont'>
        <SideBar selector={selector} setSelector={setSelector} />
        {selector.files && <DisplayContainer />}
        {selector.uploadFile && <FileUpload setSelector={setSelector} />}
        {selector.uploadFolder && <FolderUpload setSelector={setSelector} />}
        {selector.createFolder && <CreateFolder setSelector={setSelector} />}
      </div>
    </div>
  );
}

export default Main;
