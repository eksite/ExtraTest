import React from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";

const filter = (data, text) => {
  if (isNaN(text)) {
    return data.filter(
      (item) => item.name.toLowerCase().includes(text) || item.email.toLowerCase().includes(text)
    );
  } else {
    return data.filter((item) => item._id == text || item.age == text);
  }
};

const Table = () => {
  const data = useSelector((state) => {
    const filterText = state.field.text;
    const data = state.data.data;
   return filterText ? filter(data, filterText) : state.data.data
  });
  const size = data.length;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>id</div>
        <div>name</div>
        <div>age</div>
        <div>gender</div>
        <div>email</div>
      </div>
      <div style={{ height: "90%", width: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              useIsScrolling
              className="List"
              height={height}
              itemCount={size}
              itemSize={20}
              width={width}
              itemData={data}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export default Table;
