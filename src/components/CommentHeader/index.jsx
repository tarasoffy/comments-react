import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsSvg from "../../assets/icons/CommentsSvg";
import { fetchDeleteComments } from "../../store/slices/commentsSlice";
import './CommentHeader.scss'


const CommentHeader = ({
  photo, 
  name, 
  commentUserId, 
  commentId, 
  visibleReply,
  visibleEdit}) => {

  let dispatch = useDispatch();

  let { user } = useSelector((user) => user.commentsSlice);

  const replyComment = () => {
    visibleReply()
  };

  const commentEdit = () => {
    visibleEdit()
  };

  const commentDelete = () => {
    dispatch(fetchDeleteComments({ id: commentId }));
  };

  return (
    <div className="comment__header">
      <div className="comment__user-info">
        <img src={photo} alt="photo" />
        <div className="comment__user-name">
          {name}
          {commentUserId === user.userId && <span>you</span>}
        </div>
        <p className="comment__user-data"></p>
      </div>
      <div className="comment__reply">
        {commentUserId === user.userId ? (
          <div className=" comment__wrapper-btn">
            <div onClick={commentDelete} className="comment__delete">
              <CommentsSvg id="delete" />
              <button className="comment__delete-btn">Delete</button>
            </div>
            <div onClick={commentEdit} className="comment__edit">
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
  );
};

export default CommentHeader;
