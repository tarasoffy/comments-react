import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  user: {
    userName: 'raul',
    userPhoto: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
    userId: 123153342,
  },
  comments: []
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    let response = await axios('http://localhost:3005/comments');
    return response.data
  }
)

export const fetchNewComments = createAsyncThunk(
  'comments/fetchNewComments',
  async ({comment, id}) => {
    let response = await axios.post('http://localhost:3005/comments', {
        id: id,
        user: {
          userId: initialState.user.userId,
          userPhoto: initialState.user.userPhoto,
          userName: initialState.user.userName
        },
        data: Date.now(),
        comment: comment,
        counterLikes: 0,
        replys: []
      });
    return response.data
  }
)

export const commentsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addReplyComment: (state, {payload}) => {
      let commentData = {
        commentId: Date.now().toFixed(5),
        addressed: payload.addressed,
        user: {
          userId: state.user.userId,
          userPhoto: state.user.userPhoto,
          userName: state.user.userName
        },
        data: Date.now(),
        comment: payload.comment,
        counterLikes: 0
      } 

      let comment = state.comments.filter(item => item.commentId === payload.commentId)
      comment[0].replys.push(commentData)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, {payload}) => {
      state.comments = payload
    })

    builder.addCase(fetchNewComments.fulfilled, (state, {payload}) => {
      state.comments.push(payload)
    })
  },
})


export const { addReplyComment } = commentsSlice.actions

export default commentsSlice.reducer