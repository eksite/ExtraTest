import React from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import TableHeader from './TableHeader.jsx';

const filter = (data, text) => {
  if (isNaN(text)) {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        item.email.toLowerCase().includes(text)
    );
  } else {
    return data.filter((item) => item._id == text || item.age == text);
  }
};

const Table = () => {
  const data = useSelector((state) => {
    const filterText = state.field.text;
    const data = state.data.data;
    return filterText ? filter(data, filterText) : state.data.data;
  });
  const size = data.length;
  const sortedData = useSelector((state) => {
    const sortedParams = state.sort;
    console.log(sortedParams);
    const newData = data.slice().sort((a, b) => {
      if (a[sortedParams.key] < b[sortedParams.key]) {
        return sortedParams.direction === "ascending" ? -1 : 1;
      }
      if (a[sortedParams.key] > b[sortedParams.key]) {
        return sortedParams.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return newData;
  });
  return (
    <>
      <TableHeader />
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
              itemData={sortedData}
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
