import React from 'react';
import './App.css';  
import coverImage from './img/image.png'; 

function Cover() {
  return (
    <div className="cover-container">
      <img src={coverImage} alt="Cover" className="cover-image" />
    </div>
  );
}

export default Cover;
