import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { commentSlice } from "app/slices/comment";
import { AppState } from "app/store";

export const getSelectedCommentData = () => {
  return createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[commentSlice.name].selectedCommentId
  );
};
