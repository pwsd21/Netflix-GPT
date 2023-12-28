import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    gptSearchList: null,
  },
  reducers: {
    gptSearchToggle: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.gptMovies = movieResults;
      state.gptSearchList = movieNames;
    },
  },
});

export const { gptSearchToggle, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
