import { createSlice } from "@reduxjs/toolkit";

let ID = 49999;

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    loadFromJson: (state, action) => {
      state.data = action.payload.data;
    },
    addRow: (state, action) => {
      const { name, gender, age, email } = action.payload;
      state.data.push({
        _id: ++ID,
        name: name,
        gender: gender,
        age: age,
        email: email,
      });
    },
    removeRow: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload.id);
    },
    editData: (state, action) => {
      const { id, name, age, email } = action.payload;
      state.data = state.data.map((item) =>
        item._id == id ? { ...item, name: name, age: age, email: email } : item
      );
    },
  },
});

export const { loadFromJson, removeRow, editData, addRow } = dataSlice.actions;

export default dataSlice.reducer;
