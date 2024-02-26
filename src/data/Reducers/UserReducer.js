import { createSlice } from "@reduxjs/toolkit";
// import { clearErrors, getErrorText } from "./ErrorReducer";
import { SetAuthToken } from "../Config";
import axios from "axios";
import { getAllDatabase } from "./databaseSlice";
import { fetchAllUsers, getDbState } from "./adminSlice";
// import { toast } from "react-toastify";

export const TOKEN = "DOXA_LOGIN";

let initialState = {
  user: {},
  isAuth: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem(TOKEN, payload?.token);
      state.user = payload?.user ? payload?.user : null;
      state.isAuth = true;
    },
    setUser: (state, { payload }) => {
      if (payload) {
        state.user = payload?.data ? payload?.data : null;
      }
    },
    setAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
    setAdmin: (state, { payload }) => {
      state.isAdmin = payload ? payload : false;
    },
    getUser: (state, { payload }) => {
      if (payload?.token) {
        localStorage.setItem(TOKEN, payload?.token);
      }
      state.user = payload;
      state.isAuth = true;
    },

    logout: (state) => {
      localStorage.removeItem(TOKEN);
      state.user = null;
      state.isAuth = false;
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, getUser, setUser, setAdmin, setAuth } =
  userSlice.actions;

export default userSlice.reducer;

// GET USER INFO
export const loadUser = () => async (dispatch) => {
  let token = localStorage.getItem(TOKEN);
  if (token) SetAuthToken(token);

  try {
    const res = await axios.get("/user");
    if (res.data?.data.admin) {
      dispatch(setAdmin(true));
      dispatch(fetchAllUsers());
      dispatch(getDbState());
    }
    dispatch(getAllDatabase());
    console.log({ res });
    dispatch(setAuth(true));
    dispatch(getUser(res.data?.data));
  } catch (err) {
    dispatch(setAuth(false));
    console.log(err);
  }
};
