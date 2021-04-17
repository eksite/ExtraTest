import { createSlice } from "@reduxjs/toolkit";

export const fieldSlice = createSlice({
  name: "field",
  initialState: {
    text: "",
    type: "",
    filterBy: "key",
  },
  reducers: {
    editField: (state, action) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    changeSortedWay: (state, action) => {
      state.filterBy = action.payload.filterBy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editField, changeSortedWay } = fieldSlice.actions;

export default fieldSlice.reducer;
