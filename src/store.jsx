import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './redux/taskSlice.js'

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
})