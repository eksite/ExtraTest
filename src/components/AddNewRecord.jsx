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
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
);

const initialState = {
  name: "",
  age: 0,
  email: "",
  gender: "male",
  nameDirty: false,
  ageDirty: false,
  emailDirty: false,
};

const ACTIONS = {
  RESET_STATE: "reset_state",
  UPDATE_VALUE: "update_value",
  ALL_DIRTY: "all_dirty"
};

const rowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_STATE:
      return initialState;
    case ACTIONS.UPDATE_VALUE: {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
        [action.payload.dirtyName]: true,
      };
    }
    case ACTIONS.ALL_DIRTY: {
      return { ...state, nameDirty: true, ageDirty: true, emailDirty: true };
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

const AddNewRecord = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(rowReducer, initialState);

  const handleSubmit = () => {
    dispatch({type: ACTIONS.ALL_DIRTY})
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
      isValidAge(state.age)
    );
  };

  return (
    <Container>
      <TextField
        helperText={"Enter name"}
        error={state.nameDirty && !isValidName(state.name)}
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: {
              value: e.target.value,
              key: "name",
              dirtyName: "nameDirty",
            },
          })
        }
      />

      <TextField
        helperText={"Enter age"}
        error={state.ageDirty && !isValidAge(state.age)}
        value={state.age == 0 ? "" : state.age}
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: {
              value: e.target.value,
              key: "age",
              dirtyName: "ageDirty",
            },
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

        <FormHelperText>Choose gender</FormHelperText>
      </SelectContainer>
      <TextField
        helperText={"Enter email"}
        error={state.emailDirty && !isValidEmail(state.email)}
        value={state.email}
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_VALUE,
            payload: {
              value: e.target.value,
              key: "email",
              dirtyName: "emailDirty",
            },
          })
        }
      />

      <Button onClick={handleSubmit}>ADD</Button>
    </Container>
  );
};

export default AddNewRecord;
