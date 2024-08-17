import React from "react";
import axios from "axios";

import { useState } from "react";
import "@fontsource/archivo-black";
import "./SearchPage.css";
import Alert from "@mui/material/Alert";

import DynamicTable from "../../Components/DynamicTable/DynamicTable"
import InputBoxWithButton from "../../Components/InputBoxWithButton/InputBoxWithButton";
import "../../Components/InputBoxWithButton/InputBoxWithButton.css";



const SearchPage = () => {
  const [productSubmitted, setProductSubmitted] = useState(false);
  const [productsFound, setProductsFound] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showErrorBanner, setShowErrorBanner] = useState(false)
  const [showItemAddedBanner, setShowItemAddedBanner] = useState(false);

  const handleItemAdded = () => {
    setShowItemAddedBanner(true)
    setTimeout(() => {
      setShowItemAddedBanner(false)
    }, 2000);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if(inputValue === ""){
      setShowErrorBanner(true)
      return;
    }

    setProductSubmitted(true);
    setShowErrorBanner(false)
    axios
      .post("http://localhost:4000/api/search", { product: inputValue })
      .then((res) => {
        console.log(res.data);
        setProductsFound(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
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
          <DynamicTable data={productsFound} handleItemAdded={handleItemAdded}/>
        ) : (
          <></>
        )}
      </div>


      {showErrorBanner && (
        <div className="alert-banner">
          <Alert variant="filled" severity="error">
            Please enter an item
          </Alert>
        </div>
      )}
        {showItemAddedBanner && (
        <div className="alert-banner">
          <Alert variant="filled" severity="info">
            Item Added to Cart !
          </Alert>
        </div>
      )}





    </div>
  );
};

export default SearchPage;
