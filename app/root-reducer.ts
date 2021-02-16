import { combineReducers } from "@reduxjs/toolkit";
import { commentSlice } from "app/slices/comment";
import { currentUserSlice } from "app/slices/currentUser";
import { fileSlice } from "app/slices/file";

const rootReducer = combineReducers({
  file: fileSlice.reducer,
  comment: commentSlice.reducer,
  currentUser: currentUserSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
