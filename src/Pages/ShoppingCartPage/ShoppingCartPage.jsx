import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./Components/CheckoutForm"
import ShoppingCart from "./Components/ShoppingCart";
import useForm from "./Hooks/CheckoutHook";
import checkoutValidator from "../../utils/Validation/CheckoutValidation";
import { toast } from "react-toastify";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [allProductDetails, setAllProductDetails] = useState([]);
  const hasQueried = useRef(false);

  useEffect(() => {
    // Check if the effect has already run
    if (hasQueried.current) return;

    const itemIDs = cartItems.map((item) => item.ID);

    const fetchPrices = async () => {
      try {
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

        setAllProductDetails(productDetails);
        console.log(productDetails);
      } catch (error) {
        console.error("Error fetching prices:", error);
        toast.error("Failed to load prices.", {
          position: "bottom-right"
        });
      }
    };

    if (itemIDs.length > 0) {
      fetchPrices();
    }

    hasQueried.current = true;
  }, [cartItems]);

  const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: null,
    streetAddress: "",
    postCode: "",
    cardNumber: null,
    nameOnCard: "",
    expiryDate: "",
    securityCode: null,
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    checkoutValidator,
    toast
  );

  const productDetailsById = allProductDetails.reduce((acc, item) => {
    acc[item.ItemId] = item;
    return acc;
  }, {});

  return (
    <div>
      <ShoppingCart
        cartItems={cartItems}
        productDetailsById={productDetailsById}
        handleSubmit={handleSubmit}
      />
      <CheckoutForm
        values={values}
        errors={errors}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ShoppingCartPage;
