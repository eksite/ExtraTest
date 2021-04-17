import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { removeRow, editData } from "../redux/dataSlice.jsx";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Styled from "styled-components";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  height: 100%;
  width: 100%;
  justify-content: center;
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

const RowItem = (data) => {
  const {
    data: { _id, name, age, gender, email },
  } = data;
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
    <Container>
      <RowItemContainer>{_id}</RowItemContainer>
      {!editToggle ? (
        <RowItemContainer>{name}</RowItemContainer>
      ) : (
        <RowItemContainer>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </RowItemContainer>
      )}
      {!editToggle ? (
        <RowItemContainer>{age}</RowItemContainer>
      ) : (
        <RowItemContainer>
          <input value={newAge} onChange={(e) => setNewAge(e.target.value)} />
        </RowItemContainer>
      )}
      <RowItemContainer>{gender}</RowItemContainer>
      {!editToggle ? (
        <RowItemContainer>{email}</RowItemContainer>
      ) : (
        <RowItemContainer>
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </RowItemContainer>
      )}
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

export default RowItem;
