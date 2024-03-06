import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  databases: [],
  currentDatabase: "",
  verifyUser: false,
  verifyMsg: "",
  isLoading: false,
  error: null,
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
    verifyUser: (state, { payload }) => {
      state.verifyUser = payload;
    },
    setVerifyMsg: (state, { payload }) => {
      state.verifyMsg = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDatabase.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllDatabase.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.databases = payload.data;
    });
    builder.addCase(getAllDatabase.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.response.data.message;
    });
  },
});

export const { setDatabase, setCurrentDatabase, verifyUser, setVerifyMsg } =
  databaseSlice.actions;
export default databaseSlice.reducer;

export const getAllDatabase = createAsyncThunk(
  "database/getAllDatabase",
  async () => {
    const res = await axios.get("/database");
    return res.data;
  }
);

export const getUserDatabase = () => async (dispatch) => {
  try {
    const res = await axios.get("/database");
    console.log(res.data);
    dispatch(setDatabase(res.data?.data));
  } catch (err) {
    console.log(err.response?.data?.message, { err });
  }
};
