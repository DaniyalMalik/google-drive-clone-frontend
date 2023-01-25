import React, { useRef } from 'react';
export default function FileUploadForm() {
    const fileInput = useRef(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const file = fileInput.current.files[0];
  
    };
    return (
        <form onSubmit={handleSubmit}>
          <input type="file" ref={fileInput} />
          <button type="submit">Upload</button>
        </form>
      );
}