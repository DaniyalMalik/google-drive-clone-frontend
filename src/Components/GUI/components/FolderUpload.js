import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import { logDOM } from '@testing-library/react';

export default function FileUploadForm({ setSelector }) {
  const fileInput = useRef(null);
  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let folderName = '';

    for (let i = 0; i < fileInput.current.files.length; i++) {
      formData.append(
        'files',
        fileInput.current.files[i],
        fileInput.current.files[i].webkitRelativePath,
      );

      folderName = fileInput.current.files[i].webkitRelativePath;
    }

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
    setSelector({ files: true, uploadFile: false, uploadFolder: false });
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
          <button type='submit'>Upload</button>
        </form>
      </div>
    </div>
  );
}
