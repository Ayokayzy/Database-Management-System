import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dbCollections: [],
  currentCollectionDetails: {},
  currentCollection: "",
  isLoading: false,
  error: null,
};

const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollections: (state, { payload }) => {
      state.dbCollections = payload;
    },
    setCurrentCollectionDetails: (state, { payload }) => {
      state.currentCollectionDetails = payload;
    },
    setCurrentColletion: (state, { payload }) => {
      state.currentCollection = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCollections.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCollections.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.dbCollections = payload.data;
    });
    builder.addCase(fetchAllCollections.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error?.response?.data?.message;
    });
  },
});

export const {
  setCollections,
  setCurrentCollectionDetails,
  setCurrentColletion,
} = CollectionSlice.actions;

export default CollectionSlice.reducer;

export const fetchAllCollections = createAsyncThunk(
  "collection/fetchAllCollections",
  async (dbId) => {
    const res = await axios.get(`/database/${dbId}`);
    console.log(res.data.data);
    return res.data;
  }
);

export const fetchCollectionDetails = (colId, dbId) => async (dispatch) => {
  try {
    const res = await axios.get(`/collection/details/${colId}/${dbId}`);
    console.log(res);
    dispatch(setCurrentCollectionDetails(res.data.data));
  } catch (err) {
    console.log(err);
  }
};
