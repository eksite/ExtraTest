import React from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./styles.css";

const App = () => {
  const data = useLoadData("data.json");
  console.log(data);
  const Row = ({ index, style }) => (
    <div style={style}>
      {/*  */}
      {data ? <>{console.log(data[index].age)}</> : smth}
    </div>
  );
  return data ? (
    <div style={{ height: "100%", width: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={1000}
            itemSize={50}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  ) : (
    <div>loading...</div>
  );
};
export default App;
