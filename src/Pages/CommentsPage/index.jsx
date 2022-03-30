import React, { useEffect } from "react";
import "./CommentsPage.scss";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../store/slices/commentsSlice";
import NewCommentInput from "../../components/NewCommentInput";


const CommentsPage = () => {
  let { comments } = useSelector((comments) => comments.commentsSlice);

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
            likes={comment.counterLikes}
            replys={comment.replys}
            commentUserId={comment.user.userId}
            commentId={comment.id}
            key={comment.id}
          />
        ))}
      </div>
      <NewCommentInput />
    </div>
  );
};

export default CommentsPage;
