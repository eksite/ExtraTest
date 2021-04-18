import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    key: "_id",
    direction: "ascending",
  },
  reducers: {
    changeSortingKey: (state, action) => {
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

export const { changeSortingKey } = sortSlice.actions;

export default sortSlice.reducer;
