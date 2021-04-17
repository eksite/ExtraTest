import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editField, changeSortedWay } from "../redux/fieldSlice.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { debounce } from "lodash";
import Radio from "@material-ui/core/Radio";

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
    <>
      <input onChange={handleChange} />
      <RadioGroup value={filterBy} onChange={handleRadio}>
        <FormControlLabel value="key" control={<Radio />} label="key" />
        <FormControlLabel value="regex" control={<Radio />} label="regex" />
      </RadioGroup>
    </>
  );
};

export default SearchBar;
