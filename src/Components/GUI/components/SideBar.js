import React from 'react';
// import icon from '../pics/drive_icon.png';
import drive from '../pics/myDrive.png';
import computers from '../pics/computers.png';
import shared from '../pics/shared.png';
import trash from '../pics/trash.png';
import cloud from '../pics/cloud.png';
import starred from '../pics/starred.png';
// import google from '../pics/google.png';
import '../css/SideBar.css';

export default function SideBar({ user, selector, setSelector }) {
  return (
    <>
      <div id='sideBar'>
        <div id='sideBarOpt'>
          <div
            className={`sideBarOptions ${selector.account && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                folderName: '',
                starred: false,
                account: true,
                trash: false,
                shared: false,
                files: false,
                uploadFile: false,
                uploadFolder: false,
                createFolder: false,
              })
            }>
            <img src={shared} alt='Reload page' className='opacity' />
            <h3>Account</h3>
          </div>
          <div
            className={`sideBarOptions ${selector.files && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                ...selector,
                account: false,
                trash: false,
                starred: false,
                shared: false,
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
            className={`sideBarOptions ${selector.starred && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                ...selector,
                account: false,
                trash: false,
                shared: false,
                starred: true,
                files: false,
                uploadFile: false,
                uploadFolder: false,
                createFolder: false,
              })
            }>
            <img src={starred} alt='Reload page' className='opacity' />
            <h3>Favourites</h3>
          </div>
          <div
            className={`sideBarOptions ${
              selector.uploadFile && 'activeSideOpt'
            }`}
            onClick={() =>
              setSelector({
                account: false,
                trash: false,
                starred: false,
                shared: false,
                files: false,
                uploadFile: true,
                uploadFolder: false,
                createFolder: false,
                folderName: '',
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
                account: false,
                trash: false,
                starred: false,
                shared: false,
                files: false,
                uploadFile: false,
                uploadFolder: true,
                createFolder: false,
                folderName: '',
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
                account: false,
                trash: false,
                shared: false,
                files: false,
                starred: false,
                uploadFile: false,
                uploadFolder: false,
                createFolder: true,
                folderName: '',
              })
            }>
            <img src={computers} alt='Reload page' className='opacity' />
            <h3>Create a Folder</h3>
          </div>
          <div
            className={`sideBarOptions ${selector.shared && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                account: false,
                trash: false,
                shared: true,
                files: false,
                uploadFile: false,
                starred: false,
                uploadFolder: false,
                createFolder: false,
                folderName: '',
              })
            }>
            <img src={shared} alt='Reload page' className='opacity' />
            <h3>Shared with me</h3>
          </div>
          <div
            className={`sideBarOptions ${selector.trash && 'activeSideOpt'}`}
            onClick={() =>
              setSelector({
                account: false,
                trash: true,
                shared: false,
                starred: false,
                files: false,
                uploadFile: false,
                uploadFolder: false,
                createFolder: false,
                folderName: '',
              })
            }>
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
              <div
                style={{
                  width: `${
                    user?.currentStorage ? (user?.currentStorage / 5) * 100 : 0
                  }%`,
                  height: '3px',
                  borderRadius: '30px',
                  backgroundColor: 'dodgerblue',
                }}
              />
            </div>
          </div>
          <div id='storageNumericalInfo'>
            <p>
              {user?.currentStorage ? (user?.currentStorage).toFixed(2) : 0} GB
              of {user?.storageLimit} GB Used
            </p>
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
