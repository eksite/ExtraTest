import React, { useReducer } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { addRecord } from "../redux/dataSlice.jsx";
import Styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

const SelectContainer = Styled.div`
  display: flex;
  flex-direction: column;
`;

const EMAIL_REGEX = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
);

const initialState = {
  name: "",
  age: 0,
  email: "",
  gender: "",
};

const ACTIONS = {
  RESET_STATE: "reset_state",
  UPDATE_VALUE: "update_value",
};

const rowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_STATE:
      return initialState;
    case ACTIONS.UPDATE_VALUE: {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    default:
      return state;
  }
};

const isValidName = (name) => {
  return name.trim().length > 0;
};

const isValidAge = (age) => {
  return age > 0 && age < 150;
};

const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const isValidGender = (gender) => {
  return gender;
};

const AddNewRecord = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(rowReducer, initialState);

  const handleSubmit = () => {
    console.log(state);
    if (isValidRecord()) {
      reduxDispatch(
        addRecord({
          name: state.name,
          age: state.age,
          gender: state.gender,
          email: state.email,
        })
      );
      dispatch({ type: ACTIONS.RESET_STATE });
    }
  };

  const isValidRecord = () => {
    return (
      isValidEmail(state.email) &&
      isValidName(state.name) &&
      isValidAge(state.age) &&
      isValidGender(state.gender)
    );
  };

  return (
    <Container>
      <TextField
        helperText={!isValidName(state.name) ? "Enter name" : ""}
        value={state.name}
        placeholder="name"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "name" },
          })
        }
      />

      <TextField
        helperText={!isValidAge(state.age) ? "Enter age" : ""}
        value={state.age == 0 ? "" : state.age}
        placeholder="age"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "age" },
          })
        }
      />
      <SelectContainer>
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
          <MenuItem value={"new"}>New</MenuItem>
        </Select>
        {!isValidGender(state.gender) ? (
          <FormHelperText>Choose gender</FormHelperText>
        ) : null}
      </SelectContainer>
      <TextField
        helperText={!isValidEmail(state.email) ? "Enter email" : ""}
        value={state.email}
        placeholder="email"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: { value: e.target.value, key: "email" },
          })
        }
      />

      <Button onClick={handleSubmit}>ADD</Button>
    </Container>
  );
};

export default AddNewRecord;
