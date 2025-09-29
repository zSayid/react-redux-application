import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  courses: [],
  selectedCourse: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // Action to set the list of courses
    getCourseStart: (state, action) => {
      state.isloading = true;
    },

    getCourseSuccess: (state, action) => {
      state.isloading = false;
      state.courses = action.payload;
      state.status = "succeeded";
    },
    getCourseFailure: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.status = "failed";
    },


    // Action to add a new course
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    // Action to select a course
    selectCourse: (state, action) => {
      state.isloading = false;
      state.selectedCourse = action.payload;
      state.status = "succeeded";
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id.$oid !== action.payload
      );
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course._id.$oid === action.payload._id.$oid
      );
      // index !== -1 means the course exists in the array.
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
  },
});

export const {
  getCourseStart,
  getCourseSuccess,
  getCourseFailure,
  //                              
  setCourses,
  addCourse,
  selectCourse,
  removeCourse,
  updateCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
