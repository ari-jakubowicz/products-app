import reducer from "./reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
  reducer: {
    store: reducer,
  },
});

export default store;
