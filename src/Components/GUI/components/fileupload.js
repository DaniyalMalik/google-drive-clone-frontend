import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function FileUpload({ setSelector, user, getUser }) {
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileInput.current.files.length === 0) {
      return alert('No files selected!');
    }

    const formData = new FormData();
    let size = 0;

    for (let i = 0; i < fileInput.current.files.length; i++) {
      size += fileInput.current.files[i].size;

      formData.append('files', fileInput.current.files[i]);
    }

    if (user?.currentStorage + size / 1024 / 1024 / 1024 >= user?.storageLimit)
      return alert('Uploaded files size is greater than your storage limit');

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

    if (res.data.success) {
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

      getUser();
    }
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
