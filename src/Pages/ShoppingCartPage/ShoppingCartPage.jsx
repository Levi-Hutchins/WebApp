import { React, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useForm from "./CheckoutHook";
import checkoutValidator from "../../Utils/Validation/CheckoutValidation";
import styles from "./ShoppingCartPage.module.css";
import CheckoutInputBox from "../../Components/InputBox/CheckoutInputBox";
import { toast } from "react-toastify";
import CustomButton from "../../Components/Button/CustomButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [allProductDetails, setAllProductDetails] = useState([]);

  // useEffect hook to query backend when the page loads / cart changes
  useEffect(() => {
    // Map through all items in the cat and get their ID into a list and make
    // a request for each ID and
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
        console.log(allProductDetails);
      } catch (error) {
        console.error("Error fetching prices:", error);
        toast.error("Failed to load prices.");
      }
    };

    if (itemIDs.length > 0) {
      fetchPrices();
    }
  }, [cartItems]);

  const productDetailsById = allProductDetails.reduce((acc, item) => {
    acc[item.ItemId] = item;
    return acc;
  }, {});

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

  const handleNumbersOnly = (e) => {
    if (!(/[0-9]/.test(e.key) || e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      toast.warning("Please enter numbers only", {
        position: "bottom-right",
      });
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    checkoutValidator,
    toast
  );

  return (
    <div>
      <div className={styles["cart-summary-panel"]}>
        <h1 style={{ color: "white" }}>Shopping Cart</h1>
        <ul style={{ listStyle: "none" }}>
          {cartItems.map((cartItem) => {
            const productDetail = productDetailsById[cartItem.ID];
            if (productDetail) {
              return (
                <li key={cartItem.ID} className={styles["cart-item"]}>
                  <div className={styles["item-details"]}>
                    {cartItem.cartQuantity > 1 ? (
                      <span className={styles["item-name"]}>
                        {cartItem.cartQuantity} x {cartItem.Name}
                      </span>
                    ) : (
                      <span className={styles["item-name"]}>
                        {cartItem.Name}
                      </span>
                    )}
                    <span className={styles["item-price"]}>
                      ${cartItem.cartQuantity * productDetail.Price.toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            } else {
              return (
                <li key={cartItem.ID} className={styles["cart-item"]}>
                  <div className={styles["item-details"]}>
                    <span className={styles["item-name"]}>{cartItem.Name}</span>
                    <span className={styles["item-price"]}></span>
                  </div>
                  <div className={styles["item-quantity"]}>
                    Quantity: {cartItem.cartQuantity}
                  </div>
                </li>
              );
            }
          })}
        </ul>
        <div className={styles["checkout-button"]}>
          <CustomButton
            displayValue={"Checkout"}
            onClick={handleSubmit}
            displayIcon={<ShoppingCartCheckoutIcon />}
          />
        </div>
      </div>

      <div className={styles["checkout-panel"]}>

        <div className={styles["checkout-input-name"]}>
          <CheckoutInputBox
            displayValue={"First Name"}
            handleChange={handleChange}
            errorLevel={!!errors.firstName}
            value={values.firstName}
            name="firstName"
          />
          <CheckoutInputBox
            displayValue={"Last Name"}
            handleChange={handleChange}
            errorLevel={!!errors.lastName}
            value={values.lastName}
            name="lastName"
          />
        </div>

        <div className={styles["checkout-inputs"]}>
          <CheckoutInputBox
            displayValue={"Email Address"}
            handleChange={handleChange}
            errorLevel={!!errors.emailAddress}
            value={values.emailAddress}
            name="emailAddress"
          />
          {errors.emailAddress && (
            <span className={styles["error-text"]}>{errors.emailAddress}</span>
          )}
          <CheckoutInputBox
            displayValue={"Phone Number"}
            handleChange={handleChange}
            errorLevel={!!errors.phoneNumber}
            value={values.phoneNumber}
            name="phoneNumber"
            onKeyPress={handleNumbersOnly}
          />
        </div>

        <div className={styles["checkout-input-address"]}>
          <CheckoutInputBox
            width="450px"
            displayValue={"Street Address"}
            handleChange={handleChange}
            errorLevel={!!errors.streetAddress}
            value={values.streetAddress}
            name="streetAddress"
          />
          <CheckoutInputBox
            displayValue={"PostCode"}
            handleChange={handleChange}
            errorLevel={!!errors.postCode}
            value={values.postCode}
            name="postCode"
            onKeyPress={handleNumbersOnly}
          />
        </div>

        <div className={styles["checkout-input-card"]}>
          <CheckoutInputBox
            width="450px"
            displayValue={"Card Number"}
            handleChange={handleChange}
            errorLevel={!!errors.cardNumber}
            value={values.cardNumber}
            name="cardNumber"
            onKeyPress={handleNumbersOnly}
          />
          <CheckoutInputBox
            width="450px"
            displayValue={"Name on Card"}
            handleChange={handleChange}
            errorLevel={!!errors.nameOnCard}
            value={values.nameOnCard}
            name="nameOnCard"
          />
        </div>

        <div className={styles["checkout-input-card-expiry-cvv"]}>
          <CheckoutInputBox
            width="200px"
            displayValue={"Expiry Date (MM / YY)"}
            handleChange={handleChange}
            errorLevel={!!errors.expiryDate}
            value={values.expiryDate}
            name="expiryDate"
          />
          <CheckoutInputBox
            width="150px"
            displayValue={"Security Code"}
            handleChange={handleChange}
            errorLevel={!!errors.securityCode}
            value={values.securityCode}
            name="securityCode"
            onKeyPress={handleNumbersOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
