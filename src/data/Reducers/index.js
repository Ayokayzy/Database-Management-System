import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";
import databaseSlice from "./databaseSlice";
import collectionSlice from "./collectionSlice";
import documentsSlice from "./documentsSlice";
import adminSlice from "./adminSlice";

const rootReducer = combineReducers({
  auth: UserReducer,
  database: databaseSlice,
  collection: collectionSlice,
  document: documentsSlice,
  error: errorSlice.reducer,
  admin: adminSlice
});

export default rootReducer;
