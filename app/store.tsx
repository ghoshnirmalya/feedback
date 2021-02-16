import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import rootReducer from "app/root-reducer"
import { createWrapper } from "next-redux-wrapper"
import { Action } from "redux"

const store = () =>
  configureStore({
    reducer: rootReducer,
  })

export type AppStore = ReturnType<typeof store>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(store)
