import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingSpinner = ({ size }) => {
  return (
    <div className="flex justify-center items-center">
        <HashLoader size={size} color={"#0A5EB0"}/>
    </div>
  )
}

export default LoadingSpinner;