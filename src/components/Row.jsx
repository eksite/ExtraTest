import React, { memo } from "react";
import { areEqual } from "react-window";

const Row = ({ data, isScrolling, index, style }) => {
  return (
    <div
      className="row"
      style={{
        ...style,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {isScrolling ? (
        "Scrolling"
      ) : (
        <>
          <div>{data[index]._id}</div>
          <div>{data[index].name}</div>
          <div>{data[index].age}</div>
          <div>{data[index].gender}</div>
          <div>{data[index].email}</div>
        </>
      )}
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    "&:hover": {
      background: "#efefef",
    },
  },
};

export default Row;
