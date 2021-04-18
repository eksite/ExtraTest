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
        {key == "_id" ? (
          direction == "ascending" ? (
            <DownArrow size="small" />
          ) : (
            <UpArrow />
          )
        ) : (
          ""
        )}
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("name");
        }}
      >
        Name
        {key == "name" ? (
          direction == "ascending" ? (
            <DownArrow />
          ) : (
            <UpArrow />
          )
        ) : (
          ""
        )}
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("age");
        }}
      >
        Age
        {key == "age" ? (
          direction == "ascending" ? (
            <DownArrow />
          ) : (
            <UpArrow />
          )
        ) : (
          ""
        )}
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("gender");
        }}
      >
        Gender
        {key == "gender" ? (
          direction == "ascending" ? (
            <DownArrow />
          ) : (
            <UpArrow />
          )
        ) : (
          ""
        )}
      </HeaderItem>
      <HeaderItem
        onClick={() => {
          handleClick("email");
        }}
      >
        Email
        {key == "email" ? (
          direction == "ascending" ? (
            <DownArrow />
          ) : (
            <UpArrow />
          )
        ) : (
          ""
        )}
      </HeaderItem>
      <HeaderItem>Actions</HeaderItem>
    </Container>
  );
};

export default TableHeader;
