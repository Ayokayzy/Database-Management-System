import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";

const rootReducer = combineReducers({
	auth: UserReducer,
	error: errorSlice.reducer,
});

export default rootReducer;
