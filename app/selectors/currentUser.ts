import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "app/store";
import { currentUserSlice } from "slices/currentUser";

export const getCurrentUserData = () => {
  return createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[currentUserSlice.name].currentUser
  );
};
