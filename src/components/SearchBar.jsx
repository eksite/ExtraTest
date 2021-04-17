import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editField, changeSortedWay } from "../redux/fieldSlice.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { debounce } from "lodash";
import Radio from "@material-ui/core/Radio";
import Styled from "styled-components";

const RadioContainer = Styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.field.filterBy);
  const delayedHandleChange = debounce((text) => {
    dispatch(editField({ text: text }));
  }, 1000);

  const handleChange = (e) => {
    delayedHandleChange(e.target.value);
  };

  const handleRadio = (e) => {
    dispatch(changeSortedWay({ filterBy: e.target.value }));
  };

  return (
    <Container>
      <input onChange={handleChange} placeholder="find data"/>
      <RadioContainer row value={filterBy} onChange={handleRadio} name="customized-radios">
        <FormControlLabel value="key"  control={<Radio />} label="key" />
        <FormControlLabel value="regex"  control={<Radio />} label="regex" />
      </RadioContainer>
    </Container>
  );
};

export default SearchBar;
