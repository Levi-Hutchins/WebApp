import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// initialize cart state, loading from localStorage if available
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
      // find the index of the item in the cart, if it exists
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ID === action.payload.ID
      );

      if (itemIndex >= 0) {
        // item exists in cart, increment quantity
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          action.payload.Name + " x" + state.cartItems[itemIndex].cartQuantity,
          {
            position: "bottom-right",
          }
        );
      } else {
        // item does not exist, add as a new item
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("item added to cart!", {
          position: "bottom-right",
        });
      }

      // update cart totals
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;
      localStorage.setItem("ShoppingCart", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ID === action.payload.ID
      );

      if (itemIndex >= 0) {
        const removedItem = state.cartItems[itemIndex];

        if (removedItem.cartQuantity > 1) {
          // decrement quantity if more than one item
          removedItem.cartQuantity -= 1;
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= removedItem.price;

          toast.info(
            action.payload.Name +
              " quantity reduced to " +
              removedItem.cartQuantity,
            {
              position: "bottom-right",
            }
          );
        } else {
          // remove item from cart if only one left
          state.cartItems = state.cartItems.filter(
            (item) => item.ID !== action.payload.ID
          );
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= removedItem.price;

          toast.info(action.payload.Name + " was removed from your cart!", {
            position: "bottom-right",
          });
        }

        localStorage.setItem("ShoppingCart", JSON.stringify(state.cartItems));
      }
    },
    emptyCart(state) {
      // clear cart items and reset totals
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;

      localStorage.setItem("ShoppingCart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
