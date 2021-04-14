import React from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useDataState } from "../context/DataContext.jsx";
import memoize from "memoize-one";

const createItemData = memoize((items) => ({
  items,
}));

const Table = ({ size }) => {
  const state = useDataState();
  const itemData = createItemData(state.data);
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
              itemData={itemData}
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
