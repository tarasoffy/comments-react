import React from "react";
import "./CommentReply.scss";
import Counter from "../Counter";
import CommentsSvg from "../../assets/icons/CommentsSvg";

const CommentReply = ({ reply }) => {

  return (
    <>
      {reply.length ? reply.map(item => 
            <div className="reply" key={item.commentId}>
            <div className="reply_wrapper">
              <div className="reply__counter">
                <Counter likes={item.couterLikes} />
              </div>
              <div className="reply__inner">
                <div className="reply__header">
                  <div className="reply__user-info">
                    <img src={item.user.userPhoto} alt="photo" />
                    <div className="reply__user-name">
                        {item.user.userName}
                        </div>
                    <p className="reply__user-data"></p>
                  </div>
                  <div className="reply__reply">
                    <CommentsSvg id="reply" />
                    <span>Reply</span>
                  </div>
                </div>
                <div className="reply__text">
                  <p><span>@{item.addressed}</span>{item.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </>
  );
};

export default CommentReply;
