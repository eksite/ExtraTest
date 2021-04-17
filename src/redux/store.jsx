import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice.jsx";
import filterSlice from "./filterSlice.jsx";
import sortSlice from "./sortSlice.jsx";

export default configureStore({ reducer: { dataFromJson: dataSlice, filter: filterSlice, sort: sortSlice } });
