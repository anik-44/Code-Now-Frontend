import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  description: null,
  duration: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (_state, action) => {
      return {
        title: action.payload?.title,
        description: action.payload?.description,
        duration: action.payload?.duration,
      };
    },
    clearNotification: () => {
      return {
        title: null,
        description: null,
        duration: null,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
