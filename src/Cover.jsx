import React from 'react';
import './App.css';  // Assuming you have a CSS file for the Cover component
import coverImage from './img/image.png'; // Import the image

function Cover() {
  return (
    <div className="cover-container">
      <img src={coverImage} alt="Cover" className="cover-image" />
    </div>
  );
}

export default Cover;
