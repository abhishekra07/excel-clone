import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./reducers/excelSlice";

const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
});

export default store;
