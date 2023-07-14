import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { farmersSlice } from 'src/slice/farmers'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: {
    rootReducer: rootReducer
  }
})
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
