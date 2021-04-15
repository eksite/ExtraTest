import { createSlice } from "@reduxjs/toolkit";

export const fieldSlice = createSlice({
  name: "field",
  initialState: {
    text: "",
    type: ""
  },
  reducers: {
    editField: (state, action) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editField } = fieldSlice.actions;

export default fieldSlice.reducer;
