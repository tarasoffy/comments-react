import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./slices/commentsSlice";

export const store = configureStore({
    reducer: {
        commentsSlice
    }
})