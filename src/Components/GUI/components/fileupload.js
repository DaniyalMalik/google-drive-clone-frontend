import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function FileUploadForm({ selector, setSelector }) {
  const fileInput = useRef(null);
  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < fileInput.current.files.length; i++) {
      formData.append('files', fileInput.current.files[i]);
    }

    // if (selector.folderName) {
    //   const res = await axios.post(
    //     'http://localhost:5000/api/upload?folderName=' + selector.folderName,
    //     formData,
    //     {
    //       headers: {
    //         'x-auth-token': localStorage.getItem('token'),
    //       },
    //     },
    //   );

    //   alert(res.data.message);

    //   if (res.data.success)
    //     setSelector({
    //       files: true,
    //       uploadFile: false,
    //       uploadFolder: false,
    //       createFolder: false,
    //       folderName: '',
    //     });
    // } else {
    const res = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    alert(res.data.message);

    if (res.data.success)
      setSelector({
        account: false,
        trash: false,
        shared: false,
        files: true,
        uploadFile: true,
        uploadFolder: false,
        createFolder: false,
        folderName: '',
      });
    // }
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
