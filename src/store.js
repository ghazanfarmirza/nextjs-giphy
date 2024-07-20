import { configureStore } from "@reduxjs/toolkit";
import gifsSlice from "./slices/gifsSlice";

const store = configureStore({
  reducer: {
    gifs: gifsSlice,
  },
});

export default store;
