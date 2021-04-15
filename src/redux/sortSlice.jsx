import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    key: "name",
    direction: "ascending",
  },
  reducers: {
    changeSortedKey: (state, action) => {
      console.log(
        state.key == action.payload.key,
        state.direction == "ascending"
      );
      if (state.key == action.payload.key) {
        state.direction =
          state.direction == "ascending" ? "descending" : "ascending";
      } else {
        state.key = action.payload.key;
        state.direction = "ascending";
      }
    },
  },
});

export const { changeSortedKey } = sortSlice.actions;

export default sortSlice.reducer;
