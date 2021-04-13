import React from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./styles.css";

const App = () => {
  const data = useLoadData("data.json");
  const Row = ({ index, style }) => (
    <div style={style}>
      <div>{data[index]._id}</div>
      <div>{data[index].name}</div>
      <div>{data[index].age}</div>
      <div>{data[index].gender}</div>
      <div>{data[index].email}</div>
      {console.log(data[index])}
    </div>
  );
  return data.length ? (
    <div style={{ height: "100%", width: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={data.length}
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
