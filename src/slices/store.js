import { configureStore } from '@reduxjs/toolkit';
import gifsReducer from './gifsSlice';

const store = configureStore({
  reducer: {
    gifs: gifsReducer,
  },
});

export default store;
