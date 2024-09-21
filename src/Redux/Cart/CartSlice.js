import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Our initial cart state is read from the localStorage to load the state
// if that is empty just an empty list
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
    removeFromCart(state, action) {
      // First find the item in the cart that has the ID of the payload ID
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ID === action.payload.ID
      );
      if (itemIndex >= 0) {
        const removedItem = state.cartItems[itemIndex];
        

          // Decrease quantity if more than 1
          if (removedItem.cartQuantity > 1) {
            // Remoce all the global cart properties
          removedItem.cartQuantity -= 1;
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= removedItem.price;
          
          toast.info(
            action.payload.Name + " quantity reduced to " + removedItem.cartQuantity,
            {
              position: "bottom-right",
            }
          );
        } else {
          // Remove item from cart if quantity is 1
          state.cartItems = state.cartItems.filter(
            (item) => item.ID !== action.payload.ID
          );
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= removedItem.price;
          
          toast.info(
            action.payload.Name + " was removed from your cart!",
            {
              position: "bottom-right",
            }
          );
        }
    
        // Update localStorage since we are storing it within there for cross page management
        localStorage.setItem("ShoppingCart", JSON.stringify(state.cartItems));
      }}
  },
});

// Exporting the reduces for other pages to use
export const { addToCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
