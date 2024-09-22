import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialCartState = {
  cartItems: localStorage.getItem("ShoppingCart")
    ? JSON.parse(localStorage.getItem("ShoppingCart"))
    : [],
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
        toast.info(
          action.payload.Name + " x" + state.cartItems[itemIndex].cartQuantity,
          {
            position: "bottom-right",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("Item Added to Cart !", {
          position: "bottom-right",
        });
      }

      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;
      localStorage.setItem("ShoppingCart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
