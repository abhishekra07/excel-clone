import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addValueToCell,
  setSelectedCell,
} from "../../store/reducers/excelSlice";
import "./ExcelTable.css";
import TableRow from "./TableRow";

const ExcelTable = () => {
  const alphabet = useSelector((state) => state.excel.alphabet);
  const rows = useSelector((state) => state.excel.rows);
  const selectedCell = useSelector((state) => state.excel.selectedCell);
  const dispatch = useDispatch();

  const handleCellClick = (row, column) => {
    dispatch(setSelectedCell({ row, column }));
  };

  const updateCellValue = (row, column, value) => {
    // console.log(`updateCellValue row:${row}, column:${column}, value:${value}`);
    dispatch(addValueToCell({ row, column, value }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          dispatch(
            setSelectedCell({
              row: Math.max(selectedCell.row - 1, 0),
              column: selectedCell.column,
            })
          );
          break;
        case "ArrowDown":
          dispatch(
            setSelectedCell({
              row: Math.min(selectedCell.row + 1, rows.length - 1),
              column: selectedCell.column,
            })
          );
          break;
        case "ArrowLeft":
          dispatch(
            setSelectedCell({
              row: selectedCell.row,
              column: Math.max(selectedCell.column - 1, 0),
            })
          );
          break;
        case "ArrowRight":
          dispatch(
            setSelectedCell({
              row: selectedCell.row,
              column: Math.min(selectedCell.column + 1, alphabet.length - 1),
            })
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, alphabet.length, rows.length, selectedCell]);

  return (
    <div className="excel-table-container">
      <div className="excel-table">
        <table>
          <thead>
            <tr>
              <th></th>
              {alphabet.map((letter) => (
                <th key={letter}>{letter}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowNum) => (
              <TableRow
                key={rowNum}
                rowNum={rowNum}
                alphabet={alphabet}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
                onCellValueChange={updateCellValue}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="scrollbar-container"></div>
    </div>
  );
};

export default ExcelTable;
