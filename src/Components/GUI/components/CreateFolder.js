import React from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

export default function CreateFolder({ setSelector }) {
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

    if (res.data.success)
      setSelector({
        account: false,
        trash: false,
        shared: false,
        files: true,
        uploadFile: false,
        uploadFolder: false,
        createFolder: false,
        folderName: '',
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
