import React from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

const App = () => {
  const data = useLoadData("data.json");
  console.log(data);
  return data ? (
    <List height={150} itemCount={data.length} itemSize={35} width={300}>
      {Row}
    </List>
  ) : (
    <div>loading...</div>
  );
};
export default App;
