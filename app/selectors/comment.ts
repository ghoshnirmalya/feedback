import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "app/store";
import { commentSlice } from "slices/comment";

export const getSelectedCommentData = () => {
  return createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[commentSlice.name].selectedCommentId
  );
};
