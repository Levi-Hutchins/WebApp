import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import styles from "../../Styles/Modals.module.css";
import InputBox from "../../../../shared-components/InputBox/InputBox";
import useFindItem from "../../Hooks/useFindItem";

const DeleteItemModal = ({ open, onClose }) => {
  const [searchBy, setSearchBy] = useState(""); 
const [searchValue, setSearchValue] = useState("")
  const {findItemByID, errors} = useFindItem();

  const handleButtonClick = (buttonValue) => {
    setSearchBy(buttonValue);
  };

  const renderDisplayValue = () => {
    switch (searchBy){
        case "ID": return "Enter Item ID";
        case "Name": return "Enter Item Name";
        case "Author": return "Enter Item Author";
        default: return ""; 
    }
  };
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  const handleSubmit = async () => {
    await findItemByID(searchValue)
  };

  return (
    <Modal open={open}>
      <Box className={styles["modal-box"]}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="h2"
          color={"white"}
          fontWeight={"bold"}
          fontSize={"24px"}
        >
          Delete An Item
        </Typography>

        <Typography
          variant="h6"
          component="h2"
          color={"white"}
          fontWeight={"bold"}
          fontSize={"20px"}
        >
          Search By
        </Typography>
        <ButtonGroup variant="contained" aria-label="Basic button group"           sx={{ gap: "10px" }} // Add spacing between buttons in the group
        >
          <Button
            onClick={() => handleButtonClick("ID")}
            sx={{
              backgroundColor: searchBy === "ID" ? "#5e43f3" : "#4F4F56",
              "&:hover": {
                backgroundColor: searchBy === "ID" ? "#4733B5" : "#353539",
              },
            }}
          >
            ID
          </Button>
          <Button
            onClick={() => handleButtonClick("Name")}
            sx={{
              backgroundColor: searchBy === "Name" ? "#5e43f3" : "#4F4F56",
              "&:hover": {
                backgroundColor: searchBy === "Name" ? "#4733B5" : "#353539",
              },
            }}
          >
            Name
          </Button>
          <Button
            onClick={() => handleButtonClick("Author")}
            sx={{
              backgroundColor: searchBy === "Author" ? "#5e43f3" : "#4F4F56",
              "&:hover": {
                backgroundColor: searchBy === "Author" ? "#4733B5" : "#353539",
              },
            }}
          >
            Author
          </Button>
        </ButtonGroup>

        {
          searchBy !== "" && (
            <InputBox displayValue={renderDisplayValue()} handleChange={handleSearchValueChange} />
          )
        }

        <CustomButton displayValue={"Find Item"} onClick={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default DeleteItemModal;
