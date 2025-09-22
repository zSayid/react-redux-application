import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.isLoading = false;
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.loggedIn = false;
      state.error = action.payload; 
    },
  },
});

export const {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} = authSlice.actions;
export default authSlice.reducer;
















// const initialState = {
//   isLoading: false,
//   actionType: null,
//   loggedIn: false,
//   user: null,
// };

// export const loginUserStart = (payload) => ({
//   type: "LOGIN_USER_START",
//   payload,
// });

// export const registerUserStart = (payload) => ({
//   type: "REGISTER_USER_START",
//   payload,
// });

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOGIN_USER_START":
//       return {
//         ...state,
//         isLoading: true,
//         actionType: action.payload.actionType,
//       };
//     case "REGISTER_USER_START":
//       return {
//         ...state,
//         isLoading: true,
//         actionType: action.payload.actionType,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
