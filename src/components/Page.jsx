import React, { useState } from "react";
import Table from "./Table.jsx";
import SearchBar from "./SearchBar.jsx";
import AddNewRow from "./AddNewRow.jsx";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import Styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AddRowContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  width: 44%;
`;

const Page = () => {
  const { data } = useSelector((state) => state.dataFromJson);
  const [addRowToggle, setAddRowToggle] = useState(false);
  const handleToggle = () => {
    setAddRowToggle(!addRowToggle);
  };

  return data ? (
    <>
      <SearchBar />
      <Container>
        {addRowToggle ? (
          <AddRowContainer>
            <Button onClick={handleToggle}>
              <RemoveOutlinedIcon /> <div>Hide</div>
            </Button>
            <AddNewRow />
          </AddRowContainer>
        ) : (
          <Button onClick={handleToggle}>
            <AddIcon /> <div>Add</div>
          </Button>
        )}
      </Container>
      <Table />
    </>
  ) : (
    <CircularProgress />
  );
};

export default Page;
