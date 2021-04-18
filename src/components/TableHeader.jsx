import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSortingKey } from "../redux/sortSlice.jsx";
import Styled from "styled-components";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
  cursor: pointer;
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

const UpArrow = Styled(ArrowUpwardIcon)`
font-size: 15px !important;
`;

const DownArrow = Styled(ArrowDownwardIcon)`
font-size: 15px !important;
`;

const TableHeader = () => {
  const dispatch = useDispatch();
  const { key, direction } = useSelector((state) => state.sort);
  const handleClick = (key) => {
    dispatch(changeSortingKey({ key: key }));
  };
  return (
    <Container>
      <HeaderItem
        onClick={() => {
          handleClick("_id");
        }}
      >
        Id
        <SortArrow sortKey={key} headerKey="_id" direction={direction} />
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("name");
        }}
      >
        Name
        <SortArrow sortKey={key} headerKey="name" direction={direction} />
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("age");
        }}
      >
        Age
        <SortArrow sortKey={key} headerKey="age" direction={direction} />
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("gender");
        }}
      >
        Gender
        <SortArrow sortKey={key} headerKey="gender" direction={direction} />
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("email");
        }}
      >
        Email
        <SortArrow sortKey={key} headerKey="email" direction={direction} />
      </HeaderItem>
      <HeaderItem>Actions</HeaderItem>
    </Container>
  );
};

const SortArrow = ({ sortKey, headerKey, direction }) => {
  return sortKey == headerKey ? (
    direction == "ascending" ? (
      <DownArrow />
    ) : (
      <UpArrow />
    )
  ) : (
    ""
  );
};

export default TableHeader;
