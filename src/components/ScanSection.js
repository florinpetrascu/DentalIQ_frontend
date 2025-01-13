// components/ScanSection.js
import React, { useState } from 'react';
import axios from 'axios';
import './ScanSection.css';

function ScanSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [returnedImageURL, setReturnedImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
    setReturnedImageURL(null); // Resetăm imaginea primită
  };

  const handleScan = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Așteptăm un blob pentru imagine
      });

      // Creăm un URL local pentru imaginea primită
      const returnedImageURL = URL.createObjectURL(response.data);
      setReturnedImageURL(returnedImageURL);
    } catch (error) {
      console.error('Error while uploading the image:', error);
      alert('Failed to upload the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="scan-section">
      <h2>Scan your mouth</h2>
      <input
        type="file"
        accept="image/*"
        className="file-input"
        onChange={handleFileChange}
      />
      <button
        className="scan-button"
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan'}
      </button>
      <div className="image-preview-section">
        {uploadedImageURL && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={uploadedImageURL} alt="Uploaded Preview" className="preview-image" />
          </div>
        )}
        {returnedImageURL && (
          <div>
            <h3>Returned Image:</h3>
            <img src={returnedImageURL} alt="Returned Preview" className="preview-image" />
          </div>
        )}
      </div>
    </section>
  );
}

export default ScanSection;
