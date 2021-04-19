import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFromJson } from "../redux/dataSlice.jsx";
import Header from "./Header.jsx";
import Page from "./Page.jsx";

const URL = "https://raw.githubusercontent.com/eksite/ExtraTest/master/data.json";

const App = () => {
  const dispatch = useDispatch();

  const loadData = async () => {
    const result = await fetch(URL).then((res) => res.json());
    dispatch(loadFromJson({ data: result }));
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
