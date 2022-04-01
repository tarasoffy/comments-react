import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./InputPopup.scss";
import { fetchEditComments, setEditVisibleInput, setReplysVisibleInput } from "../../store/slices/commentsSlice";


const InputPopup = ({ ...props }) => {

  let dispatch = useDispatch();


  let [inputValueReply, setInputValueReply] = useState("");

  let [inputValueEdit, setinputValueEdit] = useState(props.commentText);

  const editComment = () => {
    dispatch(setEditVisibleInput(null))
    dispatch(fetchEditComments({comment:inputValueEdit, id: props.id, likes: props.likes}))
  }

  const replyComment = () => {
    dispatch(setReplysVisibleInput(null))
  }

  return (
    <div className="input">
      {props.userPhoto ? <img src={props.userPhoto} alt="" /> : null}

      {props.typeInput === "reply" ? (
        <>
          <input
            type="text"
            onChange={(e) => setInputValueReply(e.target.value)}
            value={inputValueReply}
          />
          <button onClick={replyComment}>reply</button>
        </>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setinputValueEdit(e.target.value)}
            value={inputValueEdit}
          />
          <button onClick={editComment}>update</button>
        </>
      )}
    </div>
  );
};

export default InputPopup;
