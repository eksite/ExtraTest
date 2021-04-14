import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "dataJson",
  initialState: {
    data: [],
  },
  reducers: {
    loadFromJson: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadFromJson } = dataSlice.actions;

export default dataSlice.reducer;
