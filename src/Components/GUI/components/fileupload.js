import React, { useRef } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';

export default function FileUploadForm({ setSelector }) {
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('file', fileInput.current.files[0]);

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
        <p>Upload</p>
      </div>
      <div id='contentDisplayer'>
        <form onSubmit={handleSubmit}>
          <input type='file' ref={fileInput} />
          <button type='submit'>Upload</button>
        </form>
      </div>
    </div>
  );
}
