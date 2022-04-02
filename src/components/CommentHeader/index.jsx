import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsSvg from "../../assets/icons/CommentsSvg";
import {
  fetchDeleteComments,
  setReplysVisibleInput,
  setEditVisibleInput,
} from "../../store/slices/commentsSlice";
import "./CommentHeader.scss";
import { useDate } from "../../hooks/useDate";

const CommentHeader = ({ 
  photo, 
  name, 
  commentUserId, 
  commentId, // получаю id комментария
  date}) => {

  let dateComment = new Date(date)

  let dateNow = Date.now()

  let currentDate = new Date(dateNow)
  
  let daysDate = Math.ceil(Math.abs(currentDate.getTime() - dateComment.getTime()) / (1000 * 3600 * 24));

  let commetDate = useDate(daysDate)

  let dispatch = useDispatch();

  let { user } = useSelector((user) => user.commentsSlice);

  let { idReplysVisibleInput } = useSelector(
    (visible) => visible.commentsSlice
  );

  let {idEditVisibleInput} = useSelector(visible => visible.commentsSlice)

  //отправляю конкретный id комментария(не все, как при map в комп. CommentReply)
  const replyComment = () => {
    dispatch(setReplysVisibleInput(commentId));
  };

  const commentEdit = () => {
    dispatch(setEditVisibleInput(commentId));
  };

  const commentDelete = () => {
    dispatch(fetchDeleteComments({ id: commentId }));
  };

  const cancelCommentReply = () => {
    dispatch(setReplysVisibleInput(null))
  };

  const cancelCommentEdit = () => {
    dispatch(setEditVisibleInput(null))
  };


  return (
    <div className="comment__header">
      <div className="comment__user-info">
        <img src={photo} alt="photo" />
        <div className="comment__user-name">
          {name}
          {commentUserId === user.userId && <span>you</span>}
        </div>
        <p className="comment__user-data">
        {commetDate}
        </p>
      </div>
      <div className="comment__reply">
        {commentUserId === user.userId ? (
          <div className=" comment__wrapper-btn">
            <div onClick={commentDelete} className="comment__delete">
              <CommentsSvg id="delete" />
              <button className="comment__delete-btn">Delete</button>
            </div>
            {idEditVisibleInput === commentId ? 
            <button onClick={cancelCommentEdit} className="comment__reply-cancel">Cancel</button>
            :
            <div onClick={commentEdit} className="comment__edit">
              <CommentsSvg id="edit" />
              <button className="comment__edit-btn">Edit</button>
            </div>
            }
          </div>
        ) : (
          <div>
            {idReplysVisibleInput === commentId ? (
              <button onClick={cancelCommentReply} className="comment__reply-cancel">Cancel</button>
            ) : (
              <div className="comment__reply-btn" onClick={replyComment}>
              <CommentsSvg id="reply" />
                <span>Reply</span>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

export default CommentHeader;
