import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";
import databaseSlice from "./databaseSlice";
import collectionSlice from "./collectionSlice";

const rootReducer = combineReducers({
	auth: UserReducer,
	database: databaseSlice,
	collection: collectionSlice,
	error: errorSlice.reducer,
});

export default rootReducer;
