import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DisplayContainer from './components/DisplayContainer';
import FileUpload from './components/FileUpload';
import FolderUpload from './components/FolderUpload';
import './main.css';
import { useState } from 'react';

function Main({ setUserState }) {
  const [selector, setSelector] = useState({
    files: true,
    uploadFile: false,
    uploadFolder: false,
  });

  return (
    <>
      <Navbar setUserState={setUserState} />
      <div id='mainCont'>
        <SideBar selector={selector} setSelector={setSelector} />
        {selector.files && <DisplayContainer />}
        {selector.uploadFile && <FileUpload setSelector={setSelector} />}
        {selector.uploadFolder && <FolderUpload setSelector={setSelector} />}
      </div>
    </>
  );
}

export default Main;
