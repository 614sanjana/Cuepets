import React from 'react';
import './Cat.css'

function Cat() {
  return (
    

    <div id="cat-blink-container">
      <div className="cat-body"></div>
      <div className="cat-head">
        <div className="cat-ear left"></div>
        <div className="cat-ear right"></div>
        <div className="eye left-eye"></div>
        <div className="eye right-eye"></div>
        <div className="nose"></div>
        <div className="mouth"></div>
        <div className="whisker left-1"></div>
        <div className="whisker left-2"></div>
        <div className="whisker right-1"></div>
        <div className="whisker right-2"></div>
      </div>
      <div className="tail"></div>
    </div>
  );
}




export default Cat;
