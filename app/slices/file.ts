import { File } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import hydrate from "lib/hydrate";

interface IInitialState {
  file: File;
  coordinateX: number | null;
  coordinateY: number | null;
}

const initialState: IInitialState = {
  file: {} as File,
  coordinateX: null,
  coordinateY: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
    },
    setCoordinates(state, action) {
      state.coordinateX = action.payload.coordinateX;
      state.coordinateY = action.payload.coordinateY;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[fileSlice.name],
      };
    });
  },
});

export const { setFile, setCoordinates } = fileSlice.actions;
