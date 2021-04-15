import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice.jsx";
import fieldSlice from "./fieldSlice.jsx";
import sortSlice from "./sortSlice.jsx";

export default configureStore({ reducer: { data: dataSlice, field: fieldSlice, sort: sortSlice } });
