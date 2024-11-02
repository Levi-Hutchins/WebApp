
import cartReducer from "./Cart/CartSlice"
import { configureStore } from '@reduxjs/toolkit';
// register the cart reducer with the store 
const store = configureStore({
    reducer:{
      cart: cartReducer
    }
  })

export default store;