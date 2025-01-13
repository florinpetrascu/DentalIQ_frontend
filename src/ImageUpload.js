import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('cbct', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedFileName(response.data.filename);
    } catch (error) {
      setErrorMessage(error.response?.data || 'File upload failed.');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {uploadedFileName && (
        <div>
          <p>File uploaded: {uploadedFileName}</p>
          <a href={`http://localhost:3000/download/${uploadedFileName}`} download>
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
