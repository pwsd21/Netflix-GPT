import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    gptSearchToggle: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { gptSearchToggle } = gptSlice.actions;

export default gptSlice.reducer;
