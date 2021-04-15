import React from "react";
import { useDispatch } from "react-redux";
import { changeSortedKey } from "../redux/sortSlice.jsx";

const TableHeader = () => {
  const dispatch = useDispatch();

  const handleClick = (key) => {
    dispatch(changeSortedKey({ key: key }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div
        onClick={() => {
          handleClick("id");
        }}
      >
        id
      </div>
      <div
        onClick={() => {
          handleClick("name");
        }}
      >
        name
      </div>
      <div
        onClick={() => {
          handleClick("age");
        }}
      >
        age
      </div>
      <div
        onClick={() => {
          handleClick("gender");
        }}
      >
        gender
      </div>
      <div
        onClick={() => {
          handleClick("email");
        }}
      >
        email
      </div>
    </div>
  );
};

export default TableHeader;
