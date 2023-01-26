import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DisplayContainer from './components/DisplayContainer';
import FileUpload from './components/fileupload';
import './main.css';
import { useState } from 'react';

function Main() {
  const [selector, setSelector] = useState({ files: true, upload: false });

  return (
    <>
      <Navbar />
      <div id='mainCont'>
        <SideBar selector={selector} setSelector={setSelector} />
        {selector.files && <DisplayContainer />}
        {selector.upload && <FileUpload />}
      </div>
    </>
  );
}

export default Main;
