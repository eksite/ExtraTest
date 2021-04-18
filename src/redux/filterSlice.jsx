import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
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

export const { editFilter, changeSortedWay } = filterSlice.actions;

export default filterSlice.reducer;
