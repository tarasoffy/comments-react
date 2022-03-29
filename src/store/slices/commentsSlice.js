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

export const commentsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, {payload}) => {
      state.comments = payload
      
    })
  },
})


export const {  } = commentsSlice.actions

export default commentsSlice.reducer