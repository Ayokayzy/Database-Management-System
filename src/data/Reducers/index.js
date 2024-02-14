import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";
import databaseSlice from "./databaseSlice";
import collectionSlice from "./collectionSlice";
import documentsSlice from "./documentsSlice";

const rootReducer = combineReducers({
  auth: UserReducer,
  database: databaseSlice,
  collection: collectionSlice,
  document: documentsSlice,
  error: errorSlice.reducer,
});

export default rootReducer;
