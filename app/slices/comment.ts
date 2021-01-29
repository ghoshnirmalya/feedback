import { createSlice } from "@reduxjs/toolkit";
import hydrate from "lib/hydrate";

interface IInitialState {
  selectedCommentId: null | number;
}

const initialState: IInitialState = {
  selectedCommentId: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment(state, action) {
      state.selectedCommentId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[commentSlice.name],
      };
    });
  },
});

export const { setComment } = commentSlice.actions;
