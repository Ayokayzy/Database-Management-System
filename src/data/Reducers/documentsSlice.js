import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allDocuments: [],
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setAllDocuments: (state, { payload }) => {
      state.allDocuments = payload;
    },
  },
});

export const { setAllDocuments } = documentSlice.actions;
export default documentSlice.reducer;

export const fetchAllDocuments = (dbId, colId) => async (dispatch) => {
  try {
    const res = await axios.get(`/collection/${colId}/${dbId}`);
    console.log(res.data.data);
    dispatch(setAllDocuments(res.data.data));
  } catch (err) {
    console.log(err);
  }
};
