import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allDocuments: [],
  isLoading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setAllDocuments: (state, { payload }) => {
      state.allDocuments = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDocuments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllDocuments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allDocuments = payload.data;
    });
    builder.addCase(fetchAllDocuments.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.request?.data?.message;
    });
  },
});

export const { setAllDocuments } = documentSlice.actions;
export default documentSlice.reducer;

export const fetchAllDocuments = createAsyncThunk(
  "documents/fetchAllDocuments",
  async (data) => {
    const { colId, dbId } = data;
    console.log({ colId, dbId });
    const res = await axios.get(`/collection/${colId}/${dbId}`);
    console.log(res.data);
    return res.data;
  }
);
