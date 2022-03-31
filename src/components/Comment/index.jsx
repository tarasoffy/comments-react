import React, { useState } from "react";
import Counter from "../Counter";
import "./Comment.scss";
import CommentReply from "../CommentReply";
import { useSelector } from "react-redux";
import InputPopup from "../InputPopup";
import CommentHeader from "../CommentHeader";

const Comment = ({ ...props }) => {
  let { user } = useSelector((user) => user.commentsSlice);

  let [visibleReplyInput, setVisibleReplyInput] = useState(false);

  let [visibleEditInput, setVisibleEditInput] = useState(false);

  const changeVisibleEditInput = () => {
    setVisibleEditInput((!visibleEditInput));
  }

  const changeVisibleReplyInput = () => {
    setVisibleReplyInput((!visibleReplyInput));
  }

  return (
    <div className="comment">
      <div className="comment_wrapper">
        <div className="comment__counter">
          <Counter likes={props.likes} />
        </div>
        <div className="comment__inner">
          <CommentHeader
            photo={props.photo}
            name={props.name}
            commentUserId={props.commentUserId}
            commentId={props.commentId}
            visibleReply={changeVisibleReplyInput}
            visibleEdit={changeVisibleEditInput}
          />
          {visibleEditInput === false ? (
            <div className="comment__text">
              <p>{props.comment}</p>
            </div>
          ) : (
            <InputPopup 
            commentText={props.comment}
            id={props.commentId}
            button="update"
            typeInput="edit"
            visibleEditInptut={changeVisibleEditInput}
            />
          )}
        </div>
      </div>
      {visibleReplyInput && (
        <div className="comment__reply-input">
          <InputPopup
            typeInput="reply"
            commentUserId={props.commentUserId}
            commentId={props.commentId}
            addressed={props.name}
            userPhoto={user.userPhoto}
            button="reply"
          />
        </div>
      )}
      <div className="comment__reply">
        <div className="comment__reply-wrapper">
          <CommentReply reply={props.replys} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
