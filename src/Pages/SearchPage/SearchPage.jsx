import React from "react";
import axios from "axios";

import { useState } from "react";
import "@fontsource/archivo-black";
import "./SearchPage.css";

import DynamicTable from "../../Components/DynamicTable/DynamicTable";
import InputBoxWithButton from "../../Components/InputBoxWithButton/InputBoxWithButton";
import "../../Components/InputBoxWithButton/InputBoxWithButton.css";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [productSubmitted, setProductSubmitted] = useState(false);
  const [productsFound, setProductsFound] = useState("");
  const [inputValue, setInputValue] = useState("");



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
      .post("http://localhost:4000/api/search", { product: inputValue })
      .then((res) => {
        console.log(res.data);
        setProductsFound(res.data);
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
          <DynamicTable
            data={productsFound}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
