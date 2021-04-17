import React, { useState } from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import TableHeader from "./TableHeader.jsx";
import SearchBar from "./SearchBar.jsx";
import AddNewRow from "./AddNewRow.jsx";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import Styled from "styled-components";
import {
  sortString,
  filterByKey,
  filterByRegex,
  sortNumber,
} from "../utils/dataUtils.jsx";

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

const Table = () => {
  const [addRowToggle, setAddRowToggle] = useState(false);
  const data = useSelector((state) => {
    const { value: filterText, filterBy } = state.filter;
    const { data } = state.dataFromJson;
    if (filterText) {
      const filteredData =
        filterBy == "key"
          ? filterByKey(data, filterText)
          : filterByRegex(data, filterText);
      return filteredData;
    } else {
      return state.dataFromJson.data;
    }
  });

  const handleToggle = () => {
    setAddRowToggle(!addRowToggle);
  };

  const sortedData = useSelector((state) => {
    const sortedParams = state.sort;
    const newData = data
      .slice()
      .sort((item1, item2) =>
        sortedParams.key == "_id" || sortedParams.key == "age"
          ? sortNumber(item1, item2, sortedParams.key, sortedParams.direction)
          : sortString(item1, item2, sortedParams.key, sortedParams.direction)
      );
    return newData;
  });

  return (
    <>
      <SearchBar />
      <Container>
        {addRowToggle ? (
          <AddRowContainer>
            <Button onClick={handleToggle}>
              <RemoveOutlinedIcon /> Hide
            </Button>
            <AddNewRow />
          </AddRowContainer>
        ) : (
          <Button onClick={handleToggle}>
            <AddIcon /> Add
          </Button>
        )}
      </Container>
      <TableHeader />
      <div style={{ height: "74%", width: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              useIsScrolling
              className="List"
              height={height}
              itemCount={data.length}
              itemSize={35}
              width={width}
              itemData={sortedData}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export default Table;
