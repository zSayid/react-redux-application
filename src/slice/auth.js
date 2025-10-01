import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistence-storage";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },

    signUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      // token faqat login yoki register javobida bo‘lsa yozamiz
      if (action.payload.token) {
        setItem("token", action.payload.token);
      }
    },

    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      setItem("token", action.payload.token);
    },

    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const {
  signUserFailure,
  signUserStart,
  signUserSuccess,
  registerSuccess,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
