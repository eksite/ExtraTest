import React, { memo } from "react";
import { areEqual } from "react-window";

const Row = memo(({ isScrolling, data, index, style }) => {
  const item = data.items[index];
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
          <div>{item._id}</div>
          <div>{item.name}</div>
          <div>{item.age}</div>
          <div>{item.gender}</div>
          <div>{item.email}</div>
          {console.log(item)}
        </>
      )}
    </div>
  );
}, areEqual);

export default Row;
