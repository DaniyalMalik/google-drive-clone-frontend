import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';

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
    setSelector({ files: true, upload: false });
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
