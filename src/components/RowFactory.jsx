import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { addRow } from "../redux/dataSlice.jsx";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>
        <input
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          value={age == 0 ? "" : age}
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </div>
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>add</button>
    </div>
  );
};

export default RowFactory;
