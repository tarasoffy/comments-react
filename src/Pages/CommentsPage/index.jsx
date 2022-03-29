import React, { useEffect } from "react";
import "./CommentsPage.scss";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../store/slices/commentsSlice";

const CommentsPage = () => {
  let { comments } = useSelector((comments) => comments.commentsSlice);

  let { user } = useSelector((user) => user.commentsSlice);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <div className="wrapper">
      <div>
        {comments.map((comment) => (
          <Comment
            photo={comment.user.userPhoto}
            name={comment.user.userName}
            data={comment.data}
            comment={comment.comment}
            likes={comment.couterLikes}
            replys={comment.replys}
            commentUserId={comment.user.userId}
            key={comment.commentId}
          />
        ))}
      </div>
      <div className="comment-wrap">
        <div className="comment__userPhoto">
          <img src={user.userPhoto} alt="" />
        </div>
        <input type="comment" placeholder="Add a comment..." />
        <button className="comment__send">send</button>
      </div>
    </div>
  );
};

export default CommentsPage;
