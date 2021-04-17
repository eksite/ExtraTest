import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { removeRow, editData } from "../redux/dataSlice.jsx";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";

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
    setEditToggle(!editToggle);
    refreshInputs();
  };

  const refreshInputs = () => {
    setNewAge(age);
    setNewEmail(email);
    setNewName(name);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>{_id}</div>
      {!editToggle ? (
        <div>{name}</div>
      ) : (
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      )}
      {!editToggle ? (
        <div>{age}</div>
      ) : (
        <input value={newAge} onChange={(e) => setNewAge(e.target.value)} />
      )}
      <div>{gender}</div>
      {!editToggle ? (
        <div>{email}</div>
      ) : (
        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      )}
      <DeleteForeverOutlinedIcon onClick={removeItem} />
      {!editToggle ? (
        <EditOutlinedIcon onClick={() => setEditToggle(!editToggle)} />
      ) : (
        <DoneIcon onClick={handleEdit} />
      )}
    </div>
  );
};

export default RowItem;
