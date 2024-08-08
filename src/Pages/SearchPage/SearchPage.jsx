import React from "react";
import { useState } from "react";
import "@fontsource/archivo-black";
import "./SearchPage.css";
import "../../Components/InputBoxWithButton/InputBoxWithButton.css";

import InputBoxWithButton from "../../Components/InputBoxWithButton/InputBoxWithButton";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    alert("SEARCH");
  };

  return (
    <div>
      <div className="search-title">
        <h1 style={{ color: "#5e43f3" }}>FIND</h1>
        <h1 style={{ color: "white" }}> AN ITEM</h1>
      </div>

      <div className="components">
        <InputBoxWithButton
          displayValue="Search For an Item"
          onChange={handleChange}
          onSubmit={handleSearch}
          inputValueProps={inputValue}
        />
      </div>
    </div>
  );
};

export default SearchPage;
