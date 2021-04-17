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
  justify-content: space-around;
  align-items: center; 
`;
const RowItemContainer = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

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
      <div>{_id}</div>
      {!editToggle ? (
        <RowItemContainer>{name}</RowItemContainer>
      ) : (
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      )}
      {!editToggle ? (
        <RowItemContainer>{age}</RowItemContainer>
      ) : (
        <input value={newAge} onChange={(e) => setNewAge(e.target.value)} />
      )}
      <RowItemContainer>{gender}</RowItemContainer>
      {!editToggle ? (
        <RowItemContainer>{email}</RowItemContainer>
      ) : (
        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      )}
      <div>
        {!editToggle ? (
          <>
            <EditOutlinedIcon onClick={() => setEditToggle(!editToggle)} />
            <DeleteForeverOutlinedIcon onClick={removeItem} />
          </>
        ) : (
          <>
            <ClearOutlined onclick={refreshInputs} />
            <DoneIcon onClick={handleEdit} />
          </>
        )}
      </div>
    </Container>
  );
};

export default RowItem;
