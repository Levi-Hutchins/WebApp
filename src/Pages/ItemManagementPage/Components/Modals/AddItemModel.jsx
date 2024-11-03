import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [itemDetails, setItemDetails] = useState({
    Name: "",
    Author: "",
    Description: "",
    Genre: "",
    SubGenre: "",
    Published: "",
    LastUpdatedBy: "",
    LastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchUserName = async () => {
      // retrieve the logged-in user's email from local storage
      const userEmail = JSON.parse(localStorage.getItem("LogInData"))?.EmailAddress;
      console.log(userEmail);
      if (!userEmail) return;
  
      try {
        // fetch user data from the API based on the user's email
        const response = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Email,eq,${userEmail})`,
            },
          }
        );
        if (response.data) {
          setLoggedInUserName(response.data.UserName); // update state with user's username
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserName();
  }, []);

  useEffect(() => {
    // update LastUpdatedBy in itemDetails when loggedInUserName changes
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      LastUpdatedBy: loggedInUserName,
    }));
  }, [loggedInUserName]);

  const { addItem } = useItemMutations();
  const { validateAddItem } = useValidation();
  
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

  const convertToISO = (dateString) => {
    // convert date from DD/MM/YYYY format to ISO format
    const [day, month, year] = dateString.split("/").map(Number);
    const isoDate = new Date(year, month - 1, day);
    return isoDate.toISOString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // update itemDetails state with new values
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // validate item details before submitting
    if (!validateAddItem(itemDetails)) {
      return;
    }
    // convert the Published date to ISO format
    const isoPublishedDate = convertToISO(itemDetails.Published);
    const updatedItemDetails = {
      ...itemDetails,
      Published: isoPublishedDate,
    };

    try {
      // call addItem mutation to add the new item
      await addItem(updatedItemDetails);
      toast.success("Item Created!", {
        position: "bottom-right",
      });
      onClose();
    } catch (error) {
      // display an error toast if submission fails
      toast.error("Oops! An error occurred", {
        position: "bottom-right",
      });
    }
  };

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
              "& .MuiOutlinedInput-notchedOutline": {},
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
