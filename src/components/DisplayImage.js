// src/components/DisplayImage.js
import React, { useEffect, useState } from 'react';

const DisplayImage = () => {
  const [image, setImage] = useState(null);

  // Retrieve the image from local storage when the component mounts
  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  return (
    <div>
      {image && <img src={image} alt="Stored" style={{ width: '300px' }} />}
    </div>
  );
};

export default DisplayImage;
