import React from "react";
import RowItem from "./RowItem.jsx";
import Styled from "styled-components";

const Container = Styled.div`
height: 100%;
&:hover {
  background-color: #c1c8c7;
  }
}`;

const Row = ({ isScrolling, data, index, style }) => {
  return (
    <div className="row" style={style}>
      {isScrolling ? (
        "Scrolling"
      ) : (
        <Container>
          <RowItem data={data[index]} />
        </Container>
      )}
    </div>
  );
};

export default Row;
