import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "field",
  initialState: {
    value: "",
    filterBy: "key",
  },
  reducers: {
    editFilter: (state, action) => {
      state.value = action.payload.text;
    },
    changeSortedWay: (state, action) => {
      state.filterBy = action.payload.filterBy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editFilter, changeSortedWay } = filterSlice.actions;

export default filterSlice.reducer;