import { configureStore } from "@reduxjs/toolkit";
import { historySlice } from "./states/history";
import { speedSlice } from "./states/speed";

export default configureStore({
  reducer: {
    history: historySlice.reducer,
    speed: speedSlice.reducer
  },
});
