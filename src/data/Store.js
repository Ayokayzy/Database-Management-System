import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./Reducers";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//   let store = configureStore(persistedReducer);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };

const store = configureStore({
  reducer: rootReducer,
});

export default store;
