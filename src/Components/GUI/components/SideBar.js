import React from 'react';
// import icon from '../pics/drive_icon.png';
import drive from '../pics/myDrive.png';
import computers from '../pics/computers.png';
import shared from '../pics/shared.png';
import recent from '../pics/recent.png';
import starred from '../pics/starred.png';
import trash from '../pics/trash.png';
import cloud from '../pics/cloud.png';
// import google from '../pics/google.png';
import '../css/SideBar.css';

export default function SideBar({ selector, setSelector }) {
  return (
    <>
      <div id='sideBar'>
        <div id='sideBarOpt'>
          <div
            className={`sideBarOptions ${selector.files && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                files: true,
                uploadFile: false,
                uploadFolder: false,
                createFolder: false,
              })
            }>
            <img src={drive} alt='Reload page' className='opacity' />
            <h3>My Drive</h3>
          </div>
          <div
            className={`sideBarOptions ${
              selector.uploadFile && 'activeSideOpt'
            }`}
            onClick={() =>
              setSelector({
                files: false,
                uploadFile: true,
                uploadFolder: false,
                createFolder: false,
              })
            }>
            <img src={computers} alt='Reload page' className='opacity' />
            <h3>Upload Files</h3>
          </div>
          <div
            className={`sideBarOptions ${
              selector.uploadFolder && 'activeSideOpt'
            }`}
            onClick={() =>
              setSelector({
                files: false,
                uploadFile: false,
                uploadFolder: true,
                createFolder: false,
              })
            }>
            <img src={computers} alt='Reload page' className='opacity' />
            <h3>Upload Folder</h3>
          </div>
          <div
            className={`sideBarOptions ${
              selector.createFolder && 'activeSideOpt'
            }`}
            onClick={() =>
              setSelector({
                files: false,
                uploadFile: false,
                uploadFolder: false,
                createFolder: true,
              })
            }>
            <img src={computers} alt='Reload page' className='opacity' />
            <h3>Create a Folder</h3>
          </div>
          <div className='sideBarOptions'>
            <img src={shared} alt='Reload page' className='opacity' />
            <h3>Shared with me</h3>
          </div>
          <div className='sideBarOptions'>
            <img src={recent} alt='Reload page' className='opacity' />
            <h3>Recent</h3>
          </div>
          <div className='sideBarOptions'>
            <img src={starred} alt='Reload page' className='opacity' />
            <h3>Starred</h3>
          </div>
          <div className='sideBarOptions'>
            <img src={trash} alt='Reload page' className='opacity' />
            <h3>Trash</h3>
          </div>
        </div>
        <div id='storageInfo'>
          <div className='sideBarOptions'>
            <img src={cloud} alt='Reload page' className='opacity' />
            <h3>Storage</h3>
          </div>
          <div className='sideBarOptions'>
            <div id='storageLoader'>
              <div id='preLoader'></div>
            </div>
          </div>
          <div id='storageNumericalInfo'>
            <p>10 GB of 15 GB Used</p>
          </div>
          {/* <button id='buyStorage'>Buy storage</button> */}
        </div>
        {/* <div id='sponsor'>
          <p>Product by </p>
          <p> Online drive</p>
        </div> */}
      </div>
    </>
  );
}
