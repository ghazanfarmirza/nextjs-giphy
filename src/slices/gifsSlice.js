import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("OCetE6FQQx2ImXPtEJGzES5il7mrbzl8");

const initialState = {
  gifs: [],
  status: "idle",
  error: null,
};

export const fetchGifs = createAsyncThunk("gifs/fetchGifs", async () => {
  const { data } = await gf.trending({ limit: 10 });
  return data;
});

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gifs = action.payload;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gifsSlice.reducer;
