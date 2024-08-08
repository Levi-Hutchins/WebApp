import React from "react";
import axios from 'axios';

import { useState } from "react";
import "@fontsource/archivo-black";
import "./SearchPage.css";

import InputBoxWithButton from "../../Components/InputBoxWithButton/InputBoxWithButton";
import "../../Components/InputBoxWithButton/InputBoxWithButton.css";

const SearchPage = () => {
  const [productSubmitted, setProductSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setProductSubmitted(true);
    axios.post("http://localhost:4000/api/search", { product: inputValue })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });





  };

  return (
    <div>
      <div className="search-title">
        <h1 className="title-primary">FIND</h1>
        <h1 className="title-secondary"> AN ITEM</h1>
      </div>

      <div className="components">
        {productSubmitted ? (
          <h1>TRUE</h1>
        ) : (
          <InputBoxWithButton
            displayValue="Search For an Item"
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputValueProps={inputValue}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
