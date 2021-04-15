import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortBy: "",
  },
  reducers: {
    // loadFromJson: (state, action) => {
    //   state.data = action.payload.data;
    // },
  },
});


export const { } = sortSlice.actions;

export default sortSlice.reducer;
