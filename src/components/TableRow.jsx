import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { removeRow, editData } from "../redux/dataSlice.jsx";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Styled from "styled-components";
import { TextHighlighter } from "./TextHighlighter.jsx";
import EditableTextCell from "./EditableTextCell.jsx";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  height: 100%;
  width: 100%;
  justify-content: center;
  &:hover {
    background: #f1e4de;
  }
`;
const RowItemContainer = Styled.div`
  display: flex;
  align-items: center;
  flex-basis: 18%;
  &:nth-child(1) {
    justify-content: center;
    flex-basis: 10%;
  };
  &:nth-child(6) {
    flex-basis: 8%;
  };
`;

const TableRow = ({ data, style, index }) => {
  const { _id, name, age, gender, email } = data[index];
  const [record, setRecord] = useState(data[index]);
  const [editToggle, setEditToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setRecord(data[index]);
  }, [data[index]]);

  const removeItem = () => {
    dispatch(removeRow({ id: _id }));
  };

  const handleEdit = () => {
    dispatch(editData(record));
    refreshInputs();
  };

  const refreshInputs = () => {
    setEditToggle(!editToggle);
    setRecord(data[index]);
  };

  return (
    <Container style={style}>
      <RowItemContainer>
        <TextHighlighter>{_id}</TextHighlighter>
      </RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          inputValue={record.name}
          value={name}
          editMode={editToggle}
          handleChange={(e) => setRecord({ ...record, name: e.target.value })}
        />
      </RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          inputValue={record.age}
          value={age}
          editMode={editToggle}
          handleChange={(e) => setRecord({ ...record, age: e.target.value })}
        />
      </RowItemContainer>
      <RowItemContainer>{gender}</RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          inputValue={record.email}
          value={email}
          editMode={editToggle}
          handleChange={(e) => setRecord({ ...record, email: e.target.value })}
        />
      </RowItemContainer>
      <RowItemContainer>
        {!editToggle ? (
          <>
            <EditOutlinedIcon onClick={() => setEditToggle(!editToggle)} />
            <DeleteForeverOutlinedIcon onClick={removeItem} />
          </>
        ) : (
          <>
            <ClearOutlined onClick={refreshInputs} />
            <DoneIcon onClick={handleEdit} />
          </>
        )}
      </RowItemContainer>
    </Container>
  );
};

export default TableRow;
