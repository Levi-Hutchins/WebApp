import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../../Styles/Modals.module.css";
import InputBox from "../../../../shared-components/InputBox/InputBox";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import useItemMutations from "../../Hooks/useItemMutations";
import useValidation from "../../Hooks/useValidation";
const AddItemModal = ({ open, onClose }) => {
  const [itemDetails, setItemDetails] = useState({
    Name: "",
    Author: "",
    Description: "",
    Genre: "",
    SubGenre: "",
    Published: "",
    LastUpdatedBy: "storeManager", //TODO: this needs to be the employee logged in (their username)
    LastUpdated: new Date().toISOString(),
  });

  const { addItem } = useItemMutations();
  const { validateAddItem } = useValidation();

  // When an item is selceted it gets te corresponding value (1,2,3)
  // and maps through the items below to render subgenres for the next dropdown
  const subGenres = {
    1: [
      { name: "Fiction", value: 1 },
      { name: "Historical Fiction", value: 2 },
      { name: "Fantasy/Sci-Fi", value: 3 },
      { name: "Young Adult", value: 4 },
      { name: "Humour", value: 5 },
      { name: "Crime", value: 6 },
      { name: "Mystery", value: 7 },
      { name: "Romance", value: 8 },
      { name: "Thriller", value: 9 },
    ],
    2: [
      { name: "Drama", value: 1 },
      { name: "Comedy", value: 2 },
      { name: "Crime", value: 3 },
      { name: "Action", value: 4 },
      { name: "Horror", value: 5 },
      { name: "Family", value: 6 },
      { name: "Western", value: 7 },
      { name: "Documentary", value: 8 },
    ],
    3: [
      { name: "RPG", value: 1 },
      { name: "Musical game", value: 2 },
      { name: "Puzzle game", value: 3 },
      { name: "Strategy", value: 4 },
      { name: "Platform", value: 5 },
      { name: "Action-adventure", value: 6 },
      { name: "Racing", value: 7 },
      { name: "Stealth", value: 8 },
      { name: "MMORPG", value: 9 },
      { name: "Survival", value: 10 },
      { name: "Simulation", value: 11 },
      { name: "Sports", value: 12 },
      { name: "First-person shooter", value: 13 },
      { name: "Fighting", value: 14 },
    ],
  };
  // Converts the inputted date dd/mm/yyyy to iso standard
  // since thats whats in the databse
  const convertToISO = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const isoDate = new Date(year, month - 1, day);
    return isoDate.toISOString();
  };

  const handleChange = (e) => {
    // Extract the name and value from the component and update the
    // state object with the previous detaisl using a deep copy and new values
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!validateAddItem(itemDetails)) {
      return;
    }
    const isoPublishedDate = convertToISO(itemDetails.Published);
    const updatedItemDetails = {
      ...itemDetails,
      Published: isoPublishedDate,
    };

    try {
      await addItem(updatedItemDetails);
      toast.success("Item Created!", {
        position: "bottom-right",
      });
      onClose();
    } catch (error) {
      toast.error("Oops! An error occurred", {
        position: "bottom-right",
      });
    }
  };

  // Get the available sub-genres based on the selected genre
  const availableSubGenres = itemDetails.Genre
    ? subGenres[itemDetails.Genre]
    : [];

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
          Item Details
        </Typography>

        <InputBox
          displayValue={"Product Name"}
          name="Name"
          value={itemDetails.Name}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Author"}
          name="Author"
          value={itemDetails.Author}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Description"}
          name="Description"
          value={itemDetails.Description}
          handleChange={handleChange}
        />

        <FormControl
          fullWidth
          sx={{
            width: "250px",
          }}
        >
          <InputLabel id="genre-select-label" sx={{ color: "white" }}>
            Genre
          </InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={itemDetails.Genre}
            name="Genre"
            label="Genre"
            onChange={handleChange}
            sx={{
              backgroundColor: "#24242c",
              color: "white",
              borderRadius: "5px",
              "& .MuiOutlinedInput-notchedOutline": {
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#454545",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5e43f3",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            <MenuItem value={1}>Book</MenuItem>
            <MenuItem value={2}>Movie</MenuItem>
            <MenuItem value={3}>Game</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            width: "250px",
            marginTop: "1rem",
          }}
        >
          <InputLabel id="subgenre-select-label" sx={{ color: "white" }}>
            Sub Genre
          </InputLabel>
          <Select
            labelId="subgenre-select-label"
            id="subgenre-select"
            value={itemDetails.SubGenre}
            name="SubGenre"
            label="Sub Genre"
            onChange={handleChange}
            sx={{
              backgroundColor: "#24242c",
              color: "white",
              borderRadius: "5px",
 
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5e43f3",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
            disabled={!itemDetails.Genre}
          >
            {availableSubGenres.map((subGenre) => (
              <MenuItem key={subGenre.value} value={subGenre.value}>
                {subGenre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <InputBox
          displayValue={"Published Date (DD/MM/YYYY)"}
          name="Published"
          value={itemDetails.Published}
          handleChange={handleChange}
        />

        <CustomButton displayValue={"Add Item"} onClick={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default AddItemModal;
