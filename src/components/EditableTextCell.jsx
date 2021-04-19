import React from "react";
import { TextHighlighter } from "./TextHighlighter.jsx";

const EditableTextCell = ({ value, inputValue, editMode, handleChange }) => {
  return (
    <>
      {editMode ? (
        <input value={inputValue} onChange={handleChange} />
      ) : (
        <TextHighlighter>{value}</TextHighlighter>
      )}
    </>
  );
};

export default EditableTextCell;
