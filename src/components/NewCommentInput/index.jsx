import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewComments } from "../../store/slices/commentsSlice";
import './NewCommentInput.scss'

const NewCommentInput = () => {

  let dispatch = useDispatch();

  let { user } = useSelector((user) => user.commentsSlice);
  
  let [inputValue, setInputValue] = useState("");

  const addNewComment = () => {
    if(inputValue.trim().length === 0) {
      alert('Заполните поле ввода');
    } else {
      setInputValue("")
      dispatch(fetchNewComments({ comment: inputValue}));
    }
   
  };

  return (
    <div className="comment-wrap">
      <div className="comment__userPhoto">
        <img src={user.userPhoto} alt="" />
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="comment"
        placeholder="Add a comment..."
      />
      <button onClick={addNewComment} className="comment__send">
        send
      </button>
    </div>
  );
};

export default NewCommentInput;
