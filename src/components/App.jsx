import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadFromJson } from "../redux/dataSlice.jsx";
import Header from "./Header.jsx";
import Table from "./Table.jsx";
import Search from "./Search.jsx"


const App = () => {
  const dispatch = useDispatch();

  const loadData = async () => {
    const result = await fetch("data.json").then((res) => res.json());
    dispatch(loadFromJson({ data: result }));
  };
  const data = useSelector((state) => state.data.data)
  // const data = useSelector((state) => state.data.data);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Search />
      {data.length ? <Table size={data.length} /> : <div>loading...</div>}
    </>
  );
};
export default App;
