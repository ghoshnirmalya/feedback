import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, thunkAPI) => {
  try {
    const response = await fetch("https://reqres.in/api/projects?page=2")
    const { data } = await response.json()

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})
