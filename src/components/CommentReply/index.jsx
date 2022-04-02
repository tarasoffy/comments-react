import React from "react";
import "./CommentReply.scss";
import Counter from "../Counter";
import { useSelector } from "react-redux";
import CommentHeader from "../CommentHeader";
import InputPopup from "../InputPopup";

const CommentReply = ({ reply }) => {
  let { idReplysVisibleInput } = useSelector(
    (visible) => visible.commentsSlice
  );

  let { idEditVisibleInput } = useSelector((visible) => visible.commentsSlice);

  return (
    <>
      {reply.length
        ? reply.map((item) => (
            <div className="reply">
              <div className="reply_wrapper" key={item.userId}>
                <div className="reply__counter">
                  <Counter commentLike={item.counterLikes} />
                </div>
                <div className="reply__inner">
                  <CommentHeader
                    photo={item.user.userPhoto}
                    name={item.user.userName}
                    commentUserId={item.user.userId}
                    commentId={item.id} //передаем id комментария в компонент шапкт
                    date={item.data}
                  />
                  {idEditVisibleInput !== item.id ? (
                    <div className="reply__text">
                      <p>
                        <span>@{item.addressed}</span>
                        {item.comment}
                      </p>
                    </div>
                  ) : (
                    <InputPopup
                      commentText={item.comment}
                      id={item.commentId}
                      button="update"
                      typeInput="edit"
                    />
                  )}

                  {idReplysVisibleInput === item.id && (
                    <div className="comment__reply-input">
                      <InputPopup typeInput="reply" button="reply" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default CommentReply;
