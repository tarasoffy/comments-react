import React from "react";
import './Counter.scss'


const Counter = ({likes}) => {
  return (
    <div className="counter">
      <button >+</button>
      <span >{likes}</span>
      <button >-</button>
    </div>
  );
};

export default Counter;
