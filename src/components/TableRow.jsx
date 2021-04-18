import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { removeRow, editData } from "../redux/dataSlice.jsx";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Styled from "styled-components";
import { TextHighlighter } from "./TextHighlighter.jsx";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  height: 100%;
  width: 100%;
  justify-content: center;
  &:hover {
    background: gray;
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
  const [newName, setNewName] = useState(name);
  const [newAge, setNewAge] = useState(age);
  const [newEmail, setNewEmail] = useState(email);
  const [editToggle, setEditToggle] = useState(false);
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeRow({ id: _id }));
  };

  const handleEdit = () => {
    dispatch(
      editData({ id: _id, name: newName, age: newAge, email: newEmail })
    );
    refreshInputs();
  };

  const refreshInputs = () => {
    setEditToggle(!editToggle);
    setNewAge(age);
    setNewEmail(email);
    setNewName(name);
  };

  return (
    <Container style={style}>
      <RowItemContainer>
        <TextHighlighter>{_id}</TextHighlighter>
      </RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          newValue={newName}
          value={name}
          editMode={editToggle}
          handleChange={(e) => setNewName(e.target.value)}
        />
      </RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          newValue={newAge}
          value={age}
          editMode={editToggle}
          handleChange={(e) => setNewAge(e.target.value)}
        />
      </RowItemContainer>
      <RowItemContainer>{gender}</RowItemContainer>
      <RowItemContainer>
        <EditableTextCell
          newValue={newEmail}
          value={email}
          editMode={editToggle}
          handleChange={(e) => setNewEmail(e.target.value)}
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

const EditableTextCell = ({ value, newValue, editMode, handleChange }) => {
  return (
    <>
      {editMode ? (
        <input value={newValue} onChange={handleChange} />
      ) : (
        <TextHighlighter>{value}</TextHighlighter>
      )}
    </>
  );
};

export default TableRow;
