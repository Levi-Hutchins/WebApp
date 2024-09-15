import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useSelector } from "react-redux";
import "@fontsource/archivo-black";
import "./SearchPage.css";

import DynamicTable from "../../Components/DynamicTables/DynamicTable";
import InputBoxWithButton from "../../Components/InputBoxWithButton/InputBoxWithButton";
import "../../Components/InputBoxWithButton/InputBoxWithButton.css";
import { toast } from "react-toastify";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CustomButton from "../../Components/Button/CustomButton";
const SearchPage = () => {
  const [productSubmitted, setProductSubmitted] = useState(false);
  const [productsFound, setProductsFound] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      toast.error("Please Enter an Item", {
        position: "bottom-right",
      });
      return;
    }

    setProductSubmitted(true);
    axios
      .get("http://localhost:8080/api/v1/db/data/v1/inft3050/Product", {
        headers: {
          "xc-token": process.env.REACT_APP_APIKEY,
        },
        params: { where: `(Name,like,${inputValue})` },
      })
      .then((res) => {
        console.log(res.data);
        setProductsFound(res.data.list);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      toast.info("You have no items in your cart !", {
        position: "bottom-right",
      });
    } else {
      navigate("/ShoppingCart");
    }
  };

  return (
    <div>
      <div className="search-title">
        <h1 className="title-primary">FIND</h1>
        <h1 className="title-secondary"> AN ITEM</h1>
      </div>
      <div className="components-input">
        <InputBoxWithButton
          displayValue="Search For an Item"
          onChange={handleChange}
          onSubmit={handleSubmit}
          inputValueProps={inputValue}
        />
      </div>

      <div className="components-table">
        {productSubmitted ? (
          <>
            <DynamicTable data={productsFound} />
            <div style={{ marginTop: "10px" }}>
              <CustomButton
                displayValue={"Checkout"}
                displayIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckoutClick}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
