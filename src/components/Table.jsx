import React, { useState } from "react";
import Row from "./Row.jsx";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import TableHeader from "./TableHeader.jsx";
import SearchBar from "./SearchBar.jsx";
import RowFactory from "./RowFactory.jsx";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import Styled from "styled-components";

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

const filterByKey = (data, text) => {
  if (isNaN(text)) {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(text) ||
        item.email.toLowerCase().includes(text)
    );
  } else {
    return data.filter((item) => item._id == text || item.age == text);
  }
};
const filterByRegex = (data, text) => {
  const regex = new RegExp(text);
  console.log(regex);
  return data.filter(
    (item) =>
      regex.test(item._id) ||
      regex.test(item.name) ||
      regex.test(item.age) ||
      regex.test(item.email) ||
      regex.test(item.id)
  );
};

const sortA = (item1, item2, key, direction) => {
  if (item1[key] < item2[key]) {
    return direction === "ascending" ? -1 : 1;
  }
  if (item1[key] > item2[key]) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};

const Table = () => {
  const [addRowToggle, setAddRowToggle] = useState(false);
  const data = useSelector((state) => {
    const { text: filterText, filterBy } = state.field;
    const data = state.data.data;
    if (filterText) {
      const filteredData =
        filterBy == "key"
          ? filterByKey(data, filterText)
          : filterByRegex(data, filterText);
      return filteredData;
    } else {
      return state.data.data;
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
        sortA(item1, item2, sortedParams.key, sortedParams.direction)
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
            <RowFactory />
          </AddRowContainer>
        ) : (
          <Button onClick={handleToggle}>
            <AddIcon /> Add
          </Button>
        )}
      </Container>
      <TableHeader />
      <div style={{ height: "75%", width: "100%" }}>
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
