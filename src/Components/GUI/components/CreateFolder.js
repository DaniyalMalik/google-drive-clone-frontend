import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

export default function FileUploadForm({ setSelector }) {
  const fileInput = useRef(null);

  const createFolder = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      'http://localhost:5000/api/upload/create',
      { folderName: e.target.folderName.value },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);
    // setSelector({
    //   files: true,
    //   uploadFile: false,
    //   uploadFolder: false,
    //   createFolder: false,
    // });
  };

  const uploadFiles = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < fileInput.current.files.length; i++) {
      formData.append('files', fileInput.current.files[i]);
    }

    const res = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    alert(res.data.message);
    setSelector({
      files: true,
      uploadFile: false,
      uploadFolder: false,
      createFolder: false,
    });
  };

  return (
    <div id='displayCont'>
      <div id='displayInfoNav'>
        <h1>Create a Folder</h1>
      </div>
      <div id='contentDisplayer'>
        <form onSubmit={createFolder}>
          <TextField
            name='folderName'
            placeholder='Folder Name'
            style={{ padding: '10px' }}
          />
          <Button variant='outlined' type='submit' style={{ padding: '10px' }}>
            Create Folder
          </Button>
        </form>
      </div>
    </div>
  );
}
