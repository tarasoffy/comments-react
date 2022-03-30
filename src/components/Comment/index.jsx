import React, { useState } from "react";
import Counter from "../Counter";
import CommentsSvg from "../../assets/icons/CommentsSvg";
import "./Comment.scss";
import CommentReply from "../CommentReply";
import { useSelector } from "react-redux";
import ReplyInput from "../ReplyInput";

const Comment = ({ ...props }) => {
  let { user } = useSelector((user) => user.commentsSlice);

  console.log(props);

  let [visibleReplyInput, setVisibleReplyInput] = useState(false)

  // let nowDate = new Date();

  // let data = new Date(props.data);

  const replyComment = () => {
    setVisibleReplyInput(!visibleReplyInput)
  }

  return (
    <div className="comment">
      <div className="comment_wrapper">
        <div className="comment__counter">
          <Counter likes={props.likes} />
        </div>
        <div className="comment__inner">
          <div className="comment__header">
            <div className="comment__user-info">
              <img src={props.photo} alt="photo" />
              <div className="comment__user-name">
                {props.name}
                {props.commentUserId === user.userId && <span>you</span>}
              </div>
              <p className="comment__user-data"></p>
            </div>
            <div className="comment__reply">
              {props.commentUserId === user.userId ? (
                <div className=" comment__wrapper-btn">
                  <div className="comment__delete">
                    <CommentsSvg id="delete" />
                    <button className="comment__delete-btn">Delete</button>
                    </div>
                    <div className="comment__edit">
                    <CommentsSvg id="edit" />
                    <button className="comment__edit-btn">Edit</button>
                    </div>
                </div>
              ) : (
                <div onClick={replyComment}>
                  <CommentsSvg id="reply" />
                  <span>Reply</span>
                </div>
              )}
            </div>
          </div>
          <div className="comment__text">
            <p>{props.comment}</p>
          </div>
        </div>
      </div>
      {visibleReplyInput && <div className="comment__reply-input">
        <ReplyInput
        commentUserId={props.commentUserId}
        commentId={props.commentId}  
        addressed={props.name} 
        userPhoto={user.userPhoto} 
        />
      </div>}
      <div className="comment__reply">
        <div className="comment__reply-wrapper">
          <CommentReply reply={props.replys} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
