import React from "react";
import { useDispatch } from "react-redux";
import { changeSortedKey } from "../redux/sortSlice.jsx";
import Styled from "styled-components";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HeaderItem = Styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: start;
  flex-basis: 18%;
  
  &:nth-child(1) {
    justify-content: center;
    flex-basis: 10%;
  };
  &:nth-child(6) {
    flex-basis: 8%;
  };
`;

const TableHeader = () => {
  const dispatch = useDispatch();

  const handleClick = (key) => {
    dispatch(changeSortedKey({ key: key }));
  };

  return (
    <Container>
      <HeaderItem
        onClick={() => {
          handleClick("_id");
        }}
      >
        Id
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("name");
        }}
      >
        Name
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("age");
        }}
      >
        Age
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("gender");
        }}
      >
        Gender
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("email");
        }}
      >
        Email
      </HeaderItem>
      <HeaderItem>Actions</HeaderItem>
    </Container>
  );
};

export default TableHeader;
