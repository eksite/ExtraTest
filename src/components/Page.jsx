import React from "react";
import Table from "./Table.jsx";
import SearchBar from "./SearchBar.jsx";
import AddNewRecord from "./AddNewRecord.jsx";

import Styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const AddRecordContainer = Styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  align-items: center;
  margin: 0 auto;
`;

const LoadingContainer = Styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Page = () => {
  const { data } = useSelector((state) => state.dataFromJson);

  return data.length ? (
    <>
      <SearchBar />
      <AddRecordContainer>
        <AddNewRecord />
      </AddRecordContainer>
      <Table />
    </>
  ) : (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Page;
