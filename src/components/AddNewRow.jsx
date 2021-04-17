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
  email: "",
  gender: "male",
  nameError: false,
  ageError: false,
  emailError: false,
};

const ACTIONS = {
  RESET_STATE: "reset_state",
  VALIDATE_DATA: "validate_data",
  UPDATE_VALUE: "update_value",
};

const rowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_STATE:
      return { ...state, name: "", age: 0, gender: "male", email: "" };
    case ACTIONS.VALIDATE_DATA: {
      if (state.name.length < 0) {
        return { ...state, nameError: true };
      }
      if (state.age < 0 && state.age > 150) {
        return { ...state, ageError: true, nameError: false };
      }

      if (!EMAIL_REGEX.test(state.email)) {
        return { ...state, emailError: true, ageError: false };
      }

      return { ...state, emailError: false, ageError: false, nameError: false };
    }
    case ACTIONS.UPDATE_VALUE: {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    default:
      return state;
  }
};

const AddNewRow = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(rowReducer, initialState);

  const handleSubmit = () => {
    dispatch({ type: ACTIONS.VALIDATE_DATA });
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
      dispatch({ type: ACTIONS.RESET_STATE });
    }
  };

  return (
    <Container>
      <Input
        isError={state.nameError}
        value={state.name}
        placeholder="name"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "name" },
          })
        }
      />

      <Input
        isError={state.ageError}
        value={state.age == 0 ? "" : state.age}
        placeholder="age"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "age" },
          })
        }
      />

      <Select
        value={state.gender}
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "gender" },
          })
        }
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
      </Select>

      <Input
        isError={state.emailError}
        value={state.email}
        placeholder="email"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "email" },
          })
        }
      />

      <AddIcon onClick={handleSubmit} />
    </Container>
  );
};

export default AddNewRow;
