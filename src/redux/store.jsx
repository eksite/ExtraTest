import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice.jsx";
import fieldSlice from "./fieldSlice.jsx"

export default configureStore({ reducer: { data: dataSlice, field: fieldSlice } });
