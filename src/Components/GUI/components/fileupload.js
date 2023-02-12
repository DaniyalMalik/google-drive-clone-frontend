import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function FileUploadForm({ setSelector }) {
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
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
        <h1>Upload Files</h1>
      </div>
      <div id='contentDisplayer'>
        <form onSubmit={handleSubmit}>
          <input multiple type='file' ref={fileInput} />
          <Button variant='outlined' type='submit'>
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
}
