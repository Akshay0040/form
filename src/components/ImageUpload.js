// src/components/ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  // Function to convert image file to Base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload and save to local storage
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);

    // Save the image as Base64 in local storage
    localStorage.setItem('uploadedImage', base64);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ width: '300px' }} />}
    </div>
  );
};

export default ImageUpload;
