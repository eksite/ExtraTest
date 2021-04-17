import React from "react";
import RowItem from "./RowItem.jsx";

const Row = ({ isScrolling, data, index, style }) => {
  return (
    <div className="row" style={style}>
      {isScrolling ? "Scrolling" : <RowItem data={data[index]} />}
    </div>
  );
};

export default Row;
