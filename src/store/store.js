import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth';
import CourseReducer from '../slice/course';


export default configureStore({
  reducer: {
    auth: AuthReducer,
    course: CourseReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})
