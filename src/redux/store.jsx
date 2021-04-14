import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice.jsx";

export default configureStore({ reducer: { dataJson: dataSlice } });
