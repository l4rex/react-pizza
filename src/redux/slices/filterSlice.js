import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  searchValue: '',
  value: 0,
  currentPage: 1,
  sort: {
    name: 'Популярности',
    sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    changeIndex: (state, action) => {
        state.value = action.payload
    },
    onChangeSort(state, action) {
      state.sort = action.payload
    },
    onChangePage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sortType
      state.value = Number(action.payload.count)
    }
  },
})

export const selectFilter = state => state.filter

export const {  changeIndex, onChangeSort, onChangePage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer