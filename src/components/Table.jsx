import React from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import TableHeader from "./TableHeader.jsx";

const filterByKey = (data, text) => {
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
const filterByRegex = (data, text) => {
  const regex = new RegExp(text);
  console.log(regex);
  return data.filter(
    (item) =>
      regex.test(item._id) ||
      regex.test(item.name) ||
      regex.test(item.age) ||
      regex.test(item.email) ||
      regex.test(item.id)
  );
};

const sortA = (item1, item2, key, direction) => {
  if (item1[key] < item2[key]) {
    return direction === "ascending" ? -1 : 1;
  }
  if (item1[key] > item2[key]) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};

const Table = () => {
  const data = useSelector((state) => {
    const { text: filterText, filterBy } = state.field;
    const data = state.data.data;
    if (filterText) {
      const filteredData =
        filterBy == "key"
          ? filterByKey(data, filterText)
          : filterByRegex(data, filterText);
      return filteredData;
    } else {
      return state.data.data;
    }
  });
  const sortedData = useSelector((state) => {
    const sortedParams = state.sort;
    const newData = data
      .slice()
      .sort((item1, item2) =>
        sortA(item1, item2, sortedParams.key, sortedParams.direction)
      );
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
              itemCount={data.length}
              itemSize={35}
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
