import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewComments } from "../../store/slices/commentsSlice";
import './NewCommentInput.scss'

const NewCommentInput = () => {

  let dispatch = useDispatch();

  let { user } = useSelector((user) => user.commentsSlice);

  let { comments } = useSelector((commect) => commect.commentsSlice);

  let [inpuValue, setInputValue] = useState("");

  const addNewComment = () => {
    setInputValue("")
    dispatch(fetchNewComments({ comment: inpuValue, id: comments.length + 1 }));
  };

  return (
    <div className="comment-wrap">
      <div className="comment__userPhoto">
        <img src={user.userPhoto} alt="" />
      </div>
      <input
        value={inpuValue}
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
