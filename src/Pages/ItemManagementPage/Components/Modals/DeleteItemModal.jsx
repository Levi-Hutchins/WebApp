import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import styles from "../../Styles/Modals.module.css";
import InputBox from "../../../../shared-components/InputBox/InputBox";
import useFindItem from "../../Hooks/useFindItem";
import useItemMutations from "../../Hooks/useItemMutations";
const DeleteItemModal = ({ open, onClose }) => {
  const [searchBy, setSearchBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [itemFound, setItemFound] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { findItemByID, findItemByAuthor, findItemByName } = useFindItem();
  const { deleteItem } = useItemMutations();
  const handleButtonClick = (buttonValue) => {
    setSearchBy(buttonValue);
    setItemFound({});
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
    if (searchBy === "ID") {
      if (!/^\d+$/.test(searchValue)) {
        toast.error("ID must be a number", {
          position: "bottom-right",
        });
        return;
      }
    } else if (searchBy === "Name" || searchBy === "Author") {
      if (searchValue.trim() === "") {
        toast.error(`${searchBy} cannot be empty`, {
          position: "bottom-right",
        });
        return;
      }
    } else {
      toast.error("Please select a search option", {
        position: "bottom-right",
      });
      return;
    }

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

      if (Object.keys(item).length === 0) {
        toast.warn("No Items found", {
          position: "bottom-right",
        });
        return;
      }

      setItemFound(item);
    } catch (error) {
      toast.error("An error occurred while fetching the item", {
        position: "bottom-right",
      });
      console.error("Error fetching item:", error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const deleted = await deleteItem(itemFound);
      if (deleted === 1) {
        toast.success("Item deleted successfully", {
          position: "bottom-right",
        });
        setDeleteConfirm(false);
        setSearchBy("");
        setItemFound({});
        onClose();
      } else {
        toast.error("Failed to delete item. Please try again.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item", {
        position: "bottom-right",
      });
      console.error("Error deleting item:", error);
    } finally {
      setDeleteConfirm(false);
    }
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

        {searchBy !== "" &&
          itemFound &&
          Object.keys(itemFound).length === 0 && (
            <>
              <InputBox
                displayValue={renderDisplayValue()}
                handleChange={handleSearchValueChange}
              />

              <div className={styles["find-item"]}>
                <CustomButton
                  displayValue={"Find Item"}
                  onClick={handleSubmit}
                />
              </div>
            </>
          )}

        {itemFound && Object.keys(itemFound).length > 0 && (
          <div className={styles["item-found-panel"]}>
            <Typography
              variant="h6"
              color={"white"}
              fontWeight={"bold"}
              fontSize={"18px"}
              sx={{ marginTop: "20px" }}
            >
              Item Details
            </Typography>
            <Typography
              variant="body1"
              color={"white"}
              fontSize={"16px"}
              sx={{ marginTop: "10px" }}
            >
              {searchBy === "Author" ? (
                <strong>Author: {itemFound.Author}</strong>
              ) : (
                <strong>ID: {itemFound.ID}</strong>
              )}
            </Typography>
            <Typography
              variant="body1"
              color={"white"}
              fontSize={"16px"}
              sx={{ marginTop: "10px" }}
            >
              <strong>Name:</strong> {itemFound.Name}
            </Typography>
            <Typography
              variant="body1"
              color={"white"}
              fontSize={"16px"}
              sx={{ marginTop: "10px" }}
            >
              <strong>Description:</strong>{" "}
              {itemFound.Description.slice(
                0,
                itemFound.Description.indexOf(".") + 1
              )}
            </Typography>

            {!deleteConfirm ? (
              <div className={styles["button-container"]}>
                <Button
                  variant="contained"
                  className={styles["delete-button"]}
                  sx={{
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  onClick={handleDeleteClick}
                >
                  DELETE
                </Button>
              </div>
            ) : (
              <>
                <Typography
                  variant="body1"
                  color={"white"}
                  fontWeight={"bold"}
                  fontSize={"16px"}
                  sx={{ marginTop: "20px", textAlign: "center" }}
                >
                  Are you sure you want to delete this item?
                </Typography>
                <div className={styles["button-container"]}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: "10px" }}
                    onClick={handleConfirmDelete}
                  >
                    YES
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: "10px" }}
                    onClick={handleCancelDelete}
                  >
                    CANCEL
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteItemModal;
