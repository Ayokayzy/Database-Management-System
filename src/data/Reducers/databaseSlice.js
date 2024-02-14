import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  databases: [],
  currentDatabase: "",
  verify: false,
  verifyMsg: ""
};

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDatabase: (state, { payload }) => {
      state.databases = payload;
    },
    setCurrentDatabase: (state, { payload }) => {
      state.currentDatabase = payload;
    },
    verifyUser: (state, {payload}) => {
      state.verify(payload)
    },
    setVerifyMsg: (state, {payload}) => {
      state.verifyMsg = payload
    }
  },
});

export const { setDatabase, setCurrentDatabase, verifyUser, setVerifyMsg } = databaseSlice.actions;
export default databaseSlice.reducer;

export const getAllDatabase = () => async (dispatch) => {
  try {
    const res = await axios.get("/database");
    console.log(res.data);
    dispatch(setDatabase(res.data?.data));
  } catch (err) {
    console.log(err.response?.data?.message, { err });
  }
};

export const getUserDatabase = () => async (dispatch) => {
  try {
    const res = await axios.get("/database");
    console.log(res.data);
    dispatch(setDatabase(res.data?.data));
  } catch (err) {
    console.log(err.response?.data?.message, { err });
  }
};

