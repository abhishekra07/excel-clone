import React from "react";
import EditableCell from "./EditableCell";

const TableRow = ({
  rowNum,
  alphabet,
  selectedCell,
  onCellClick,
  onCellValueChange,
  currentCellValue,
}) => {
  const handleCellClick = (column) => {
    onCellClick(rowNum, column); // Call the click event handler from props
  };

  const handleCellValueChange = (column, value) => {
    // console.log(
    //   `handleCellValueChange rowNum:${rowNum}, column:${column}, value:${value}`
    // );
    onCellValueChange(rowNum, column, value);
  };

  return (
    <tr>
      <td>{rowNum}</td>
      {alphabet.map((letter, index) => (
        <EditableCell
          key={letter}
          isSelected={
            selectedCell.row === rowNum && selectedCell.column === index
          }
          rowNumber={rowNum}
          column={index}
          onCellClick={() => handleCellClick(index)}
          onCellValueChange={handleCellValueChange}
        />
      ))}
    </tr>
  );
};

export default TableRow;
