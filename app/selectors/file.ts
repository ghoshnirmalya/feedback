import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { fileSlice } from "app/slices/file";
import { AppState } from "app/store";

export const getFileData = () => {
  return createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[fileSlice.name].file
  );
};

export const getCommentCoordinates = () => {
  return createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => {
      return {
        coordinateX: state?.[fileSlice.name].coordinateX,
        coordinateY: state?.[fileSlice.name].coordinateY,
      };
    }
  );
};
