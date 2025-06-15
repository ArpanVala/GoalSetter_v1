import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import categoryReducer from '../features/categories/categorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    categories: categoryReducer,
  },
})