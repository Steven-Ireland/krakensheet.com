import './MiniBrowser.scss';

import React from 'react';

const MiniBrowser = ({ imageUrl }) => {
  return (
    <div className="MiniBrowser">
      <div className="BrowserTop">
        <div className="BrowserTop-ButtonContainer">
          <span className="BrowserButton"></span>
          <span className="BrowserButton"></span>
          <span className="BrowserButton"></span>
        </div>
      </div>
      <div className="BrowserBody">
        <img src={imageUrl} alt="Features Showcase" />
      </div>
    </div>
  );
};

export default MiniBrowser;
