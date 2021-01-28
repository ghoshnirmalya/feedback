import { combineReducers } from "@reduxjs/toolkit";
import { fileSlice } from "app/slices/file";

const rootReducer = combineReducers({
  file: fileSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
