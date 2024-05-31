import React, { useEffect, useRef, useState } from "react";

const EditableCell = ({
  rowNumber,
  column,
  isSelected,
  onCellClick,
  onCellValueChange,
}) => {
  const [value, setValue] = useState("");

  const inputRef = useRef(null);

  const handleChange = () => {
    const newValue = inputRef.current.value;
    setValue(newValue);
    onCellValueChange(column, newValue);
  };

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  return (
    <td
      className={isSelected ? "editable-cell selected-cell" : "editable-cell"}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className="editable-input"
        onFocus={onCellClick}
      />
    </td>
  );
};

export default EditableCell;
