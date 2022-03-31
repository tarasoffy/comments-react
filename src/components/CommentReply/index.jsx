import React, { useState } from "react";
import "./CommentReply.scss";
import Counter from "../Counter";
import CommentsSvg from "../../assets/icons/CommentsSvg";
import { useSelector } from "react-redux";
import CommentHeader from "../CommentHeader";
import InputPopup from "../InputPopup";

const CommentReply = ({ reply }) => {
  // let { user } = useSelector((user) => user.commentsSlice);

  let [visibleReplyInput, setVisibleReplyInput] = useState(false);

  let {idReplysVisibleInput} = useSelector(visible => visible.commentsSlice)

  const changeVisibleReplyInput = () => {
    setVisibleReplyInput((!visibleReplyInput));
  }

  return (
    <>
      {reply.length
        ? reply.map((item) => (
            <div className="reply" key={item.userId}>
              <div className="reply_wrapper">
                <div className="reply__counter">
                  <Counter likes={item.counterLikes} />
                </div>
                <div className="reply__inner">
                  <CommentHeader
                    photo={item.user.userPhoto}
                    name={item.user.userName}
                    commentUserId={item.user.userId}
                    commentId={item.id} 
                    visibleReply={changeVisibleReplyInput}
                  />
                  {/* <div className="reply__header">
                    <div className="reply__user-info">
                      <img src={item.user.userPhoto} alt="photo" />
                      <div className="reply__user-name">
                        {item.user.userName}
                        {item.user.userId === user.userId && <span>you</span>}
                      </div>
                      <p className="reply__user-data"></p>
                    </div>
                    <div className="reply__reply">
                      {item.user.userId === user.userId ? (
                        <div className=" reply__wrapper-btn">
                          <div className="reply__delete">
                            <CommentsSvg id="delete" />
                            <button className="reply__delete-btn">
                              Delete
                            </button>
                          </div>
                          <div className="reply__edit">
                            <CommentsSvg id="edit" />
                            <button className="reply__edit-btn">Edit</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <CommentsSvg id="reply" />
                          <span>Reply</span>
                        </>
                      )}
                    </div>
                  </div> */}
                  <div className="reply__text">
                    <p>
                      <span>@{item.addressed}</span>
                      {item.comment}
                    </p>
                  </div>
                  {visibleReplyInput && idReplysVisibleInput === item.id && (
                    <div className="comment__reply-input">
                      <InputPopup
                        typeInput="reply"
                        // commentUserId={props.commentUserId}
                        // commentId={item.id}
                        // addressed={props.name}
                        // userPhoto={user.userPhoto}
                        button="reply"
                      />
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
