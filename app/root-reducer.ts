import { combineReducers } from "@reduxjs/toolkit"
import { projectsSlice } from "slices/projects"

const rootReducer = combineReducers({
  projects: projectsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
