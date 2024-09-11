import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./authSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});

export default store;
