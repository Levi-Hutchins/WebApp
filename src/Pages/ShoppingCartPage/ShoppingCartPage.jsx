import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./Components/CheckoutForm";
import ShoppingCart from "./Components/ShoppingCart";
import useForm from "./Hooks/CheckoutHook";
import checkoutValidator from "../../Utils/Validation/CheckoutValidation";
import { toast } from "react-toastify";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // retrieve items in cart from redux store
  const [allProductDetails, setAllProductDetails] = useState([]); // store product details for each item in the cart
  const hasQueried = useRef(false); // track whether the prices have already been fetched

  useEffect(() => {
    // prevent redundant fetching of product details
    if (hasQueried.current) return;

    const itemIDs = cartItems.map((item) => item.ID); // extract item IDs from cart items

    const fetchPrices = async () => {
      try {
        // fetch price details for each item in the cart
        const responses = await Promise.all(
          itemIDs.map((id) =>
            axios.get(
              `http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake/${id}`,
              {
                headers: { "xc-token": process.env.REACT_APP_APIKEY },
              }
            )
          )
        );

        // filter and map responses to get valid product details
        const productDetails = responses
          .map((response) => {
            if (
              response &&
              response.data &&
              response.data.Price !== undefined
            ) {
              return response.data;
            }
            return null;
          })
          .filter((item) => item !== null);

        setAllProductDetails(productDetails); // set the fetched product details
      } catch (error) {
        console.error("Error fetching prices:", error);
        toast.error("failed to load prices.", {
          position: "bottom-right",
        });
      }
    };

    // fetch prices if there are items in the cart
    if (itemIDs.length > 0) {
      fetchPrices();
    }

    hasQueried.current = true; // mark fetching as done
  }, [cartItems]);

  const initialValues = {
    emailAddress: "",
    phoneNumber: "",
    streetAddress: "",
    postCode: "",
    suburb: "",
    state: "",
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    securityCode: "",
  };

  // handle form values and validation using custom hook
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    checkoutValidator,
    toast
  );

  // map product details by ID for quick access
  const productDetailsById = allProductDetails.reduce((acc, item) => {
    acc[item.ItemId] = item;
    return acc;
  }, {});

  return (
    <div>
      <ShoppingCart
        cartItems={cartItems}
        productDetailsById={productDetailsById}
        handleSubmit={handleSubmit} // pass handleSubmit for checkout button
      />
      <CheckoutForm
        values={values} // pass form values
        errors={errors} // pass validation errors
        handleChange={handleChange} // handle changes in form fields
      />
    </div>
  );
};

export default ShoppingCartPage;
