import React, { useState } from "react";
import TableRow from "./RowItem.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import TableHeader from "./TableHeader.jsx";

import {
  sortString,
  filterByKey,
  filterByRegex,
  sortNumber,
} from "../utils/dataUtils.jsx";

const Table = () => {
  const data = useSelector((state) => {
    const { value: searchString, filterBy } = state.filter;
    const { data } = state.dataFromJson;
    if (searchString) {
      const filteredData =
        filterBy == "key"
          ? filterByKey(data, searchString)
          : filterByRegex(data, searchString);
      return filteredData;
    } else {
      return state.dataFromJson.data;
    }
  });

  const sortedData = useSelector((state) => {
    const sortedParams = state.sort;
    const newData = data
      .slice()
      .sort((item1, item2) =>
        sortedParams.key == "_id" || sortedParams.key == "age"
          ? sortNumber(item1, item2, sortedParams.key, sortedParams.direction)
          : sortString(item1, item2, sortedParams.key, sortedParams.direction)
      );
    return newData;
  });

  return (
    <>
      <TableHeader />
      <div style={{ height: "74%", width: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              useIsScrolling
              className="List"
              height={height}
              itemCount={data.length}
              itemSize={35}
              width={width}
              itemData={sortedData}
            >
              {TableRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export default Table;
