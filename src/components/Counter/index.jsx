import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditCouter } from "../../store/slices/commentsSlice";
import './Counter.scss'



const Counter = ({commentLike, id}) => {

  let {likes} = useSelector(like => like.commentsSlice);

  let {comments} = useSelector(comment => comment.commentsSlice);

  let dispatch = useDispatch();

  const editCounter = (type) => {
    let likeId = likes.find(item => item.id === id)
    let comment = comments.find(item => item.id === id)
    if(likeId) {
      if(likeId.like === type) {
        return
      } else {
        dispatch(fetchEditCouter({data:comment, type: type}))
      }
    } else {
      dispatch(fetchEditCouter({data:comment, type: type}))
    }
  }

  return (
    <div className="counter">
      <button onClick={() => editCounter('increment')} className="counter__btn" >+</button>
      <span >{commentLike}</span>
      <button onClick={() => editCounter('decrement')} className="counter__btn" >-</button>
    </div>
  );
};

export default Counter;
