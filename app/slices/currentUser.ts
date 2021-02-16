import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import hydrate from "lib/hydrate";

interface IInitialState {
  currentUser: User | null;
}

const initialState: IInitialState = {
  currentUser: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[currentUserSlice.name],
      };
    });
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
