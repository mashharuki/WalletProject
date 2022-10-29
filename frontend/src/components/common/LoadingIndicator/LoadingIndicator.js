import React from 'react';
import './LoadingIndicator.css';

/**
 * LoadingIndicatorコンポーネント
 */
const LoadingIndicator = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;