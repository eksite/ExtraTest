import React, { useEffect } from "react";
import { useDataState, useDataDispatch } from "../context/DataContext.jsx";
import Header from "./Header.jsx";
import Table from "./Table.jsx";

const App = () => {
  const { readFromJson } = useDataDispatch();
  const state = useDataState();

  const loadData = async () => {
    const result = await fetch("data.json").then((res) => res.json());
    readFromJson(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      {state.data.length ? (
        <Table size={state.data.length} />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
export default App;
