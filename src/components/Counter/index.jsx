import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, fetchEditCouter } from "../../store/slices/commentsSlice";
import './Counter.scss'



const Counter = ({likes, id}) => {

  let {comments} = useSelector(comment => comment.commentsSlice)

  let dispatch = useDispatch()

  const editCounter = (type) => {
    let comment = comments.find(item => item.id === id)
    dispatch(fetchEditCouter({data:comment, type: type}))
  }

  return (
    <div className="counter">
      <button onClick={() => editCounter('increment')} className="counter__btn" >+</button>
      <span >{likes}</span>
      <button onClick={() => editCounter('decrement')} className="counter__btn" >-</button>
    </div>
  );
};

export default Counter;
