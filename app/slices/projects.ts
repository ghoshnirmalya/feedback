import { createSlice } from "@reduxjs/toolkit"
import hydrate from "lib/hydrate"
import Project from "types/project"

interface IInitialState {
  projects: Project[]
}

const initialState: IInitialState = {
  projects: [],
}

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[projectsSlice.name],
      }
    })
  },
})
