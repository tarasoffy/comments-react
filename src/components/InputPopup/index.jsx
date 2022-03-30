import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./InputPopup.scss";
import { addReplyComment, fetchEditComments } from "../../store/slices/commentsSlice";


const InputPopup = ({ ...props }) => {
  console.log(props);

  let dispatch = useDispatch();



  let [inputValueReply, setInputValueReply] = useState("");

  let [inputValueEdit, setinputValueEdit] = useState(props.commentText);

  // const replyComment = () => {
  //   let reply = {
  //     props.addressed,
  //     props.commentId, // на какой комментарий отвечаем
  //     props.commentUserId, //чей комментарий
  //     props.comment: inputValue
  //   }
  //   dispatch(addReplyComment(reply))
  // }

  const editComment = () => {
    props.visibleEditInptut()
    dispatch(fetchEditComments({comment:inputValueEdit, id: props.id}))
  }

  return (
    <div className="reply__input">
      {props.userPhoto ? <img src={props.userPhoto} alt="" /> : null}

      {props.typeInput === "reply" ? (
        <>
          <input
            type="text"
            onChange={(e) => setInputValueReply(e.target.value)}
            value={inputValueReply}
          />
          <button className="reply__btn">reply</button>
        </>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setinputValueEdit(e.target.value)}
            value={inputValueEdit}
          />
          <button onClick={editComment} className="reply__btn">update</button>
        </>
      )}
    </div>
  );
};

export default InputPopup;
