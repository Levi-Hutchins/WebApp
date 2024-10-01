import { React, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Box, Typography, TextField, IconButton, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import CustomButton from "../../../../shared-components/Button/CustomButton";
import styles from "../../Styles/Modals.module.css";
import useFindItem from '../../Hooks/useFindItem';
import InputBox from "../../../../shared-components/InputBox/InputBox";

const EditItemModal = ({ open, onClose }) => {
  const [searchBy, setSearchBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [itemFound, setItemFound] = useState(null);
  const [isEditable, setIsEditable] = useState({
    name: false,
    author: false,
    description: false,
    genre: false,
    subGenre: false,
    published: false,
  });

  const { findItemByID, findItemByAuthor, findItemByName } = useFindItem();

  const handleButtonClick = (buttonValue) => {
    setSearchBy(buttonValue);
    setItemFound(null);
  };

  const renderDisplayValue = () => {
    switch (searchBy) {
      case "ID":
        return "Enter Item ID";
      case "Name":
        return "Enter Item Name";
      case "Author":
        return "Enter Item Author";
      default:
        return "";
    }
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async () => {
    let item = null;
    try {
      switch (searchBy) {
        case "ID":
          item = await findItemByID(searchValue);
          break;
        case "Name":
          item = await findItemByName(searchValue);
          break;
        case "Author":
          item = await findItemByAuthor(searchValue);
          break;
        default:
          item = "No results";
          break;
      }

      if (!item || Object.keys(item).length === 0) {
        toast.warn("No Items found", { position: "bottom-right" });
        return;
      }

      setItemFound(item);
    } catch (error) {
      toast.error("An error occurred while fetching the item", { position: "bottom-right" });
      console.error("Error fetching item:", error);
    }
  };

  const handleEditClick = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const renderEditableField = (label, value, field) => (
    <Box className={styles["editable-field"]} key={field}>
      <TextField
        label={label}
        value={value || ''}
        disabled={!isEditable[field]}
        onChange={(e) => setItemFound({ ...itemFound, [field]: e.target.value })}
        fullWidth
        margin="normal"
        InputLabelProps={{
          style: { color: 'white' },
        }}
        InputProps={{
          style: { color: 'white' },
          endAdornment: (
            <IconButton onClick={() => handleEditClick(field)} sx={{ color: 'white' }}>
            <EditIcon />
          </IconButton>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#24242c', 
            '& fieldset': {
              borderColor: '#454545', 
            },
            '&:hover fieldset': {
              borderColor: '#454545', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e43f3', 
            },
            '& input': {
              color: 'white', 
            },
          },
        }}
      />
  
    </Box>
  );
  
  

  return (
    <Modal open={open} onClose={onClose}>
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

        <Typography variant="h6" component="h2" color={"white"} fontWeight={"bold"} fontSize={"24px"}>
          Edit An Item
        </Typography>

        <Typography variant="h6" component="h2" color={"white"} fontWeight={"bold"} fontSize={"20px"}>
          Search By
        </Typography>

        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ gap: "10px", marginTop: "10px" }}
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

        {searchBy && !itemFound && (
          <>
            <InputBox displayValue={renderDisplayValue()} handleChange={handleSearchValueChange} />

            <div className={styles["find-item"]}>
              <CustomButton displayValue={"Find Item"} onClick={handleSubmit} />
            </div>
          </>
        )}

        {itemFound && (
          <Grid container spacing={2} >
            <Grid item xs={6}>
              {renderEditableField("Name", itemFound.Name, "name")}
              {renderEditableField("Genre", itemFound.Genre, "genre")}
            </Grid>
            <Grid item xs={6}>
              {renderEditableField("Author", itemFound.Author, "author")}
              {renderEditableField("SubGenre", itemFound.SubGenre, "subGenre")}
            </Grid>
            <Grid item xs={6}>
              {renderEditableField("Description", itemFound.Description, "description")}
            </Grid>
            <Grid item xs={6}>
              {renderEditableField("Published", itemFound.Published, "published")}
            </Grid>

            <Grid item xs={12}>
              <Box className={styles["button-container"]}>
                <CustomButton displayValue="Save" onClick={() => { /*TODO: PATCH update here */}} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default EditItemModal;
