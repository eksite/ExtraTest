import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { editField } from '../redux/fieldSlice.jsx';
import {debounce} from 'lodash'
const SearchBar = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.field.text)
    const delayedHandleChange = debounce(text => {dispatch(editField({text: text})); console.log(data)}, 1000);

    const handleChange = (e) => {
        delayedHandleChange(e.target.value)
    }

    return (
        <input onChange={handleChange}/>
    )
}

export default SearchBar;