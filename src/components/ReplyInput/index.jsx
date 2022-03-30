import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './ReplyInput.scss'
import { addReplyComment } from '../../store/slices/commentsSlice'

const ReplyInput = ({addressed, userPhoto, commentId, commentUserId}) => {


  let dispatch = useDispatch()

  let [inputValue, setInputValue] = useState(`@${addressed}, `)

  const replyComment = () => {
    let reply = {
      addressed,
      commentId, // на какой комментарий отвечаем
      commentUserId, //чей комментарий
      comment: inputValue
    }
    dispatch(addReplyComment(reply))
  }

  return (
    <div className='reply__input'>
      <img src={userPhoto} alt="" />
      <input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue}/>
      <button onClick={replyComment} className='reply__btn'>reply</button>
    </div>
  )
}

export default ReplyInput