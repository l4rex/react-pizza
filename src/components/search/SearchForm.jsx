import React, { useContext, useRef, useCallback, useState } from 'react';
import styles from './SearchForm.module.scss'
// import AppContext from '../../context';
import {debounce} from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';


const SearchForm = () => {

    const {searchValue} = useSelector(state => state.filter)
    const dispatch = useDispatch()

const [value, setValue] = useState('')

// const {findPizza, setFindPizza} = useContext(AppContext)

const inputRef = useRef()
 




const updateSearch = useCallback(
    debounce((str) => {
   dispatch(setSearchValue(str))
    }, 250),
    []
)

const onChangeInput = (e) => {
    setValue(e.target.value)
    updateSearch(e.target.value)
}

const handleClickSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchValue(''))
    inputRef.current.focus()
}

    return (
        <form>
         <input 
         ref={inputRef}
         type="text" 
         placeholder="Искать здесь..." 
         value={value} 
         onChange={onChangeInput}/>
        {value && <button type="submit" onClick={handleClickSearch}>clear</button>}     
        </form>
    );
};

export default SearchForm;