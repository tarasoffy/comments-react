import React from 'react'
import './ReplyInput.scss'

const ReplyInput = ({addressed}) => {
  return (
    <div className='reply__input'>
      <input type="text" value={'@'+addressed+', '}/>
      <button className='reply__btn'>reply</button>
    </div>
  )
}

export default ReplyInput