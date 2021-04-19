import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFilter, changeSortedWay } from "../redux/filterSlice.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { debounce } from "lodash";
import Radio from "@material-ui/core/Radio";
import Styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const RadioContainer = Styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  margin-left: 18px;
  align-items: center;
  justify-content: center;
`;

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.filter.filterBy);
  const delayedHandleChange = debounce((text) => {
    dispatch(editFilter({ text: text }));
  }, 1000);

  const handleChange = (e) => {
    delayedHandleChange(e.target.value);
  };

  const handleRadio = (e) => {
    dispatch(changeSortedWay({ filterBy: e.target.value }));
  };

  return (
    <Container>
      <TextField onChange={handleChange} placeholder={filterBy=="key" ? "ex. fry": "ex. t{3}"}/>
      <RadioContainer row value={filterBy} onChange={handleRadio}>
        <FormControlLabel value="key" control={<Radio />} label="key" />
        <FormControlLabel value="regex" control={<Radio />} label="regex" />
      </RadioContainer>
    </Container>
  );
};

export default SearchBar;
