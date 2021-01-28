import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "app/store";
import { fileSlice } from "slices/file";

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
