import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userName: "raul",
    userPhoto:
      "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
    userId: 123153342,
  },
  comments: [],
  idEditVisibleInput: null,
  idReplysVisibleInput: null,
  likes: []
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    let response = await axios("http://localhost:3005/comments");
    return response.data;
  }
);

export const fetchEditComments = createAsyncThunk(
  "comments/fetchEditComments",
  async ({ id, comment, likes }, { dispatch }) => {
    
    let response = await axios.put(`http://localhost:3005/comments/${id}`, {
      id: id,
      user: {
        userId: initialState.user.userId,
        userPhoto: initialState.user.userPhoto,
        userName: initialState.user.userName,
      },
      data: Date.now(),
      comment: comment,
      counterLikes: likes,
      replys: [],
    });
    dispatch(editComment({ comment: comment, id: id }));
    return response.data;
  }
);

export const fetchEditCouter = createAsyncThunk(
  "comments/fetchEditCounter",
  async ({ data, type }, { dispatch }) => {
    if (type === "increment") {
      let response = await axios.put(
        `http://localhost:3005/comments/${data.id}`,
        {
          id: data.id,
          user: data.user,
          data: data.data,
          comment: data.comment,
          counterLikes: data.counterLikes + 1,
          replys: data.replys,
        }
      );
      dispatch(setCounterComment({ data, type }));
      return response.data;
    } else {
      if (data.counterLikes === 0) {
        return;
      } else {
        let response = await axios.put(
          `http://localhost:3005/comments/${data.id}`,
          {
            id: data.id,
            user: data.user,
            data: data.data,
            comment: data.comment,
            counterLikes: data.counterLikes - 1,
            replys: data.replys,
          }
        );
        dispatch(setCounterComment({ data, type }));
        return response.data;
      }
    }
  }
);

export const fetchDeleteComments = createAsyncThunk(
  "comments/fetcDeleteComments",
  async ({ id }, { dispatch }) => {
    let response = await axios.delete(`http://localhost:3005/comments/${id}`);
    dispatch(deleteComment(id));
    return response.data;
  }
);

export const fetchNewComments = createAsyncThunk(
  "comments/fetchNewComments",
  async ({ comment }) => {
    let response = await axios.post("http://localhost:3005/comments", {
      id: Math.round(Math.random() * 1000000),
      user: {
        userId: initialState.user.userId,
        userPhoto: initialState.user.userPhoto,
        userName: initialState.user.userName,
      },
      data: Date.now(),
      comment: comment,
      counterLikes: 0,
      replys: [],
    });
    return response.data;
  }
);

export const commentsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setReplysVisibleInput: (state, { payload }) => {
      console.log(payload);
      state.idEditVisibleInput = null;
      state.idReplysVisibleInput = payload;
    },

    setEditVisibleInput: (state, { payload }) => {
      state.idReplysVisibleInput = null;
      state.idEditVisibleInput = payload;
    },

    editComment: (state, { payload }) => {
      let editComment = state.comments.find((item) => item.id === payload.id);
      editComment.comment = payload.comment;
    },

    deleteComment: (state, { payload }) => {
      let restComments = state.comments.filter((item) => item.id !== payload);
      state.comments = restComments;
    },

    setCounterComment: (state, { payload }) => {
      state.likes.push({id:payload.data.id, type: payload.type})
      let comment = state.comments.find((item) => item.id === payload.data.id);
      let like = state.likes.find((item) => item.id === payload.data.id);
      if (payload.type === "increment") {
        like.like = 'increment'
        comment.counterLikes = comment.counterLikes + 1;
      } else {
        if (comment.counterLikes === 0) {
          return;
        } else {
          like.like = 'decrement'
          comment.counterLikes = comment.counterLikes - 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments = payload;
    });

    builder.addCase(fetchNewComments.fulfilled, (state, { payload }) => {
      state.comments.push(payload);
    });
  },
});

export const {
  addReplyComment,
  deleteComment,
  editComment,
  setReplysVisibleInput,
  setEditVisibleInput,
  setCounterComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
