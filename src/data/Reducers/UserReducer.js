import { createSlice } from "@reduxjs/toolkit";
// import { clearErrors, getErrorText } from "./ErrorReducer";
// import { SetAuthToken } from "../Config";
// import axios from "axios";
// import { toast } from "react-toastify";

export const TOKEN = "DOXA_LOGIN";

let initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem(TOKEN, payload);
	  state.user = payload;
    },
    setUser: (state, { payload }) => {
      state.isUpdated = true;
      state.user = payload;
    },
    getUser: (state, { payload }) => {
      if (payload?.token) {
        localStorage.setItem(TOKEN, payload?.token);
      }
    },
    logout: (state) => {
      localStorage.removeItem(TOKEN);
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, getUser, setUser } = userSlice.actions;

export default userSlice.reducer;

// GET USER INFO
export const loadUser = () => async (dispatch) => {
  let auth =  localStorage.getItem(TOKEN);
  dispatch(setUser(auth))
};
