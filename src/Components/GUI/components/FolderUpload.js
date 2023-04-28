import React, { useRef, useEffect } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function FolderUpload({ user, getUser, setSelector }) {
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileInput.current.files.length === 0) {
      return alert('No folder selected or it is empty!');
    }

    const formData = new FormData();
    let size = 0;
    let folderName = '';

    for (let i = 0; i < fileInput.current.files.length; i++) {
      formData.append(
        'files',
        fileInput.current.files[i],
        fileInput.current.files[i].webkitRelativePath,
      );

      size += fileInput.current.files[i].size;
      folderName = fileInput.current.files[i].webkitRelativePath;
    }

    if (user?.currentStorage + size / 1024 / 1024 / 1024 >= user?.storageLimit)
      return alert('Uploaded folder size is greater than your storage limit');

    folderName = folderName.split('/')[0];

    const res = await axios.post(
      'http://localhost:5000/api/upload?folderName=' + folderName,
      formData,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      setSelector({
        account: false,
        trash: false,
        shared: false,
        files: true,
        starred: false,
        uploadFile: false,
        uploadFolder: false,
        createFolder: false,
        folderName: '',
      });

      getUser();
    }
  };

  return (
    <div id='displayCont'>
      <div id='displayInfoNav'>
        <h1>Upload Folder</h1>
      </div>
      <div id='contentDisplayer'>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            ref={fileInput}
            webkitdirectory='true'
            mozdirectory='true'
            directory='true'
          />
          <Button variant='outlined' type='submit'>
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
}
