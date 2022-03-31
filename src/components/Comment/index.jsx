import React from "react";
import Counter from "../Counter";
import "./Comment.scss";
import CommentReply from "../CommentReply";
import { useSelector } from "react-redux";
import InputPopup from "../InputPopup";
import CommentHeader from "../CommentHeader";

const Comment = ({ ...props }) => {

  let { user } = useSelector((user) => user.commentsSlice);

  let {idReplysVisibleInput} = useSelector(visible => visible.commentsSlice)

  let {idEditVisibleInput} = useSelector(visible => visible.commentsSlice)

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
          />
          {idEditVisibleInput !== props.commentId ? (
            <div className="comment__text">
              <p>{props.comment}</p>
            </div>
          ) : (
            <InputPopup 
            commentText={props.comment}
            id={props.commentId}
            button="update"
            typeInput="edit"
            />
          )}
        </div>
      </div>
      {idReplysVisibleInput === props.commentId && (
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
