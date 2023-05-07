import React from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

export default function CreateFolder({ setSelector }) {
  const [disabled, setDisabled] = React.useState(false);

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

    setDisabled(false);

    alert(res.data.message);

    if (res.data.success)
      setSelector({
        account: false,
        trash: false,
        shared: false,
        files: true,
        uploadFile: false,
        uploadFolder: false,
        starred: false,
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
        <form
          onSubmit={(e) => {
            setDisabled(true);
            createFolder(e);
          }}>
          <TextField
            name='folderName'
            placeholder='Folder Name'
            required
            style={{ padding: '10px' }}
          />
          <Button
            variant='outlined'
            type='submit'
            style={{
              padding: '10px',
            }}
            disabled={disabled}>
            Create Folder
          </Button>
        </form>
      </div>
    </div>
  );
}
