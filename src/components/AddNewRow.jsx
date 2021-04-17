import React, { useState, useReducer } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { addRow } from "../redux/dataSlice.jsx";
import Styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  
`;

const Input = Styled.input`
  props.isError ? "rgba(18, 24, 57, 0.04)" : ""};
`;

const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$");

const initialState = {
  name: "",
  age: 0,
  gender: "",
  email: "",
  gender: "male",
  nameError: false,
  ageError: false,
  genderError: false,
  emailError: false,
};

const rowReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_INPUTS":
      return { ...state, name: "", age: 0, gender: "male", email: "" };
    case "VALIDATE_DATA": {
      if (state.name.length < 0) {
        return { ...state, nameError: true };
      }
      if (state.age < 0 && state.age > 150) {
        return { ...state, ageError: true, nameError: false };
      }
      console.log(state.nameError, state.ageError, state.emailError, "before");
      if (!EMAIL_REGEX.test(state.email)) {
        return { ...state, emailError: true, ageError: false };
      }

      return { ...state, emailError: false, ageError: false, nameError: false };
    }
    case "CHANGE_FIELD_VALUE": {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    default:
      return state;
  }
};

const AddNewRow = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(rowReducer, initialState);

  const validateData = () => {
    dispatch({ type: "VALIDATE_DATA" });
  };

  const refreshData = () => {
    dispatch({ type: "REFRESH_INPUTS" });
  };

  const changeFieldValue = (value, key) => {
    dispatch({
      type: "CHANGE_FIELD_VALUE",
      payload: { key: key, value: value },
    });
  };

  const handleSubmit = () => {
    validateData();
    console.log(state.nameError, state.ageError, state.emailError);
    if (!state.nameError && !state.ageError && !state.emailError) {
      reduxDispatch(
        addRow({
          name: state.name,
          age: state.age,
          gender: state.gender,
          email: state.email,
        })
      );
      refreshData();
    }
  };

  return (
    <Container>
      <Input
        isError={state.nameError}
        value={state.name}
        placeholder="name"
        onChange={(e) => changeFieldValue(e.target.value, "name")}
      />

      <Input
        isError={state.ageError}
        value={state.age == 0 ? "" : state.age}
        placeholder="age"
        onChange={(e) => changeFieldValue(e.target.value, "age")}
      />

      <Select
        value={state.gender}
        onChange={(e) => changeFieldValue(e.target.value, "gender")}
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
      </Select>

      <Input
        isError={state.emailError}
        value={state.email}
        placeholder="email"
        onChange={(e) => changeFieldValue(e.target.value, "email")}
      />

      <AddIcon onClick={handleSubmit} />
    </Container>
  );
};

export default AddNewRow;
