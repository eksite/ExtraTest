import React, { useState } from "react";
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

const RowFactory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name && age && gender && email) {
      dispatch(addRow({ name: name, age: age, gender: gender, email: email }));
    }
  };

  return (
    <Container>
      <input
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        value={age == 0 ? "" : age}
        placeholder="age"
        onChange={(e) => setAge(e.target.value)}
      />

      <Select value={gender} onChange={(e) => setGender(e.target.value)}>
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
      </Select>

      <input
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <AddIcon onClick={handleSubmit} />
    </Container>
  );
};

export default RowFactory;
