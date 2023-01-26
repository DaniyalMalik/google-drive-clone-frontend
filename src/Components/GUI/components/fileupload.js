import React, { useRef } from 'react';
import '../css/DisplayContainer.css';

export default function FileUploadForm() {
  const fileInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = fileInput.current.files[0];
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
