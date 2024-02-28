import React from "react";

import spiner from './spinner.png'
export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="spinner_img">
        <img alt="loading" src={spiner} height={100} width={100}/>
      </div>
    </div>
  );
}