import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFromJson } from "../redux/dataSlice.jsx";
import Header from "./Header.jsx";
import Page from "./Page.jsx";

const App = () => {
  const dispatch = useDispatch();

  const loadData = async () => {
    const result = await fetch("https://raw.githubusercontent.com/eksite/ExtraTest/master/data.json").then((res) => res.json());
    dispatch(loadFromJson({ data: result }));
    console.log(URL)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Page />
    </>
  );
};
export default App;
