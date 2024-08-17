import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ID === action.payload.ID
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price; // Assuming `price` is a property in the product object
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
