import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    loadFromJson: (state, action) => {
      state.data = action.payload.data;
    },
  },
});


export const { loadFromJson } = dataSlice.actions;

export default dataSlice.reducer;
