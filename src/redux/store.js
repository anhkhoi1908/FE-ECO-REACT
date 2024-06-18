import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slice/counterSlice'
import userReducer from './slice/userSlide'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer
  },
})

