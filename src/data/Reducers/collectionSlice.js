import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dbCollections: [],
  currentCollectionDetails: {},
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
  },
});

export const { setCollections, setCurrentCollectionDetails } =
  CollectionSlice.actions;

export default CollectionSlice.reducer;

export const fetchAllCollections = (dbId) => async (dispatch) => {
  try {
    const res = await axios.get(`/database/${dbId}`);
    console.log(res.data.data);
    dispatch(setCollections(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchCollectionDetails = (colId, dbId) => async (dispatch) => {
  try {
    const res = await axios.get(`/collection/details/${colId}/${dbId}`);
    dispatch(setCurrentCollectionDetails(res.data.data));
  } catch (err) {
    console.log(err);
  }
};
