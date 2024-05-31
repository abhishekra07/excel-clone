import { createSlice } from "@reduxjs/toolkit";

const excelSlice = createSlice({
  name: "excel",
  initialState: {
    filename: "untitled",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    rows: Array.from({ length: 35 }, (_, index) => index + 1),
    selectedCell: { row: 1, column: 0 },
    cellValues: {},
  },
  reducers: {
    updateFilename: (state, action) => {
      state.filename = action.payload.filename;
    },
    addValueToCell: (state, action) => {
      const { row, column, value } = action.payload;
      const cellKey = `${column}${row}`;
      state.cellValues[cellKey] = {
        value,
        isBold: false,
      };
    },
    toggleBold: (state, action) => {
      const { row, column } = action.payload;
      const cellKey = `${column}${row}`;
      if (state.cellValues[cellKey]) {
        state.cellValues[cellKey].isBold = !state.cellValues[cellKey].isBold;
      }
    },
    setSelectedCell: (state, action) => {
      state.selectedCell = action.payload;
    },
  },
});

export const { updateFilename, addValueToCell, toggleBold, setSelectedCell } =
  excelSlice.actions;
export default excelSlice.reducer;
