import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dbState: {},
  dbDetails: {},
  allUsers: [],
  usersLoading: false,
  usersError: null,
  dbLoading: false,
  userDbLoading: false,
  dbError: null,
  userDbError: null,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDbState: (state, { payload }) => {},
    setDbDetails: (state, { payload }) => {},
    setAllUsers: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.usersLoading = true;
      state.usersError = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
      state.usersLoading = false;
      state.allUsers = payload.data;
    });
    builder.addCase(fetchAllUsers.rejected, (state, { error }) => {
      state.usersLoading = false;
      state.usersError = error.message;
    });
    builder.addCase(getDbState.pending, (state) => {
      state.dbLoading = true;
      state.dbError = null;
    });
    builder.addCase(getDbState.fulfilled, (state, { payload }) => {
      state.dbLoading = false;
      state.dbState = payload.data;
    });
    builder.addCase(getDbState.rejected, (state, { error }) => {
      state.dbLoading = false;
      state.dbError = error.message;
    });
    builder.addCase(getUserDbDetails.pending, (state) => {
      state.userDbLoading = true;
      state.userDbError = null;
    });
    builder.addCase(getUserDbDetails.fulfilled, (state, { payload }) => {
      state.userDbLoading = false;
      state.dbDetails = payload.data;
    });
    builder.addCase(getUserDbDetails.rejected, (state, { error }) => {
      state.userDbLoading = false;
      state.userDbError = error.message;
    });
  },
});

export default AdminSlice.reducer;
export const { setAllUsers, setDbDetails, setDbState } = AdminSlice.actions;

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await axios.get("admin/users");
    return res.data;
  }
);

export const getDbState = createAsyncThunk("admin/getDbState", async () => {
  const res = await axios.get("/admin/db-state");
  return res.data;
});

export const getUserDbDetails = createAsyncThunk(
  "admin/getUserDbDetails",
  async (id) => {
    const res = await axios.get(`/admin/users/${id}`);
    return res;
  }
);
