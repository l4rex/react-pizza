import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const {category, sortBy, search, currentPage} = params
 
  const {data} = await axios.get(
    `https://35f681bb0d44f86d.mokky.dev/items?${category}&sortBy=${sortBy}&=${search}&limit=4&page=${currentPage}`
    )
console.log({category, sortBy, search, currentPage})
  return data
})


const initialState = {
  items: [],
  status: 'loading',
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    addPizzas: (state, action) => {
      state.items = action.payload
    }   
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading"
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success"
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error"
          state.items = []
       })
 }
})



export const { addPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer