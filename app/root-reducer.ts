import { combineReducers } from "@reduxjs/toolkit";
import { commentSlice } from "app/slices/comment";
import { fileSlice } from "app/slices/file";

const rootReducer = combineReducers({
  file: fileSlice.reducer,
  comment: commentSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
