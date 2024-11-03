import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import styles from "../../Styles/Modals.module.css";
import InputBox from "../../../../shared-components/InputBox/InputBox";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useValidation from "../../Hooks/useValidation";
import useUsers from "../../Hooks/useUsers";
import { toast } from "react-toastify";

const AddUserModal = ({ open, onClose }) => {
  const { validateAddUser } = useValidation();
  const { addUser } = useUsers();
  const [userDetails, setUserDetails] = useState({
    UserName: "",
    Email: "",
    Name: "",
    IsAdmin: false, 
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    // update userDetails state based on form input changes
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdminChange = (e) => {
    // toggle the IsAdmin field when checkbox is changed
    const { checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      IsAdmin: checked,
    }));
  };

  const handleSubmit = async () => {
    // validate user details before attempting to add the user
    if (!validateAddUser(userDetails)) {
      return;
    }
    try {
      // attempt to add the user and show success toast if successful
      if (await addUser(userDetails)) {
        toast.success("User created successfully", {
          position: 'bottom-right'
        });
      }
    } catch (err) {
      // show error toast if there is an issue creating the user
      toast.error("Error creating user", {
        position: 'bottom-right'
      });
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
          User Details
        </Typography>

        <InputBox
          displayValue={"UserName"}
          name="UserName"
          value={userDetails.UserName}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Email Address"}
          name="Email"
          value={userDetails.Email}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Name"}
          name="Name"
          value={userDetails.Name}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Password"}
          name="Password"
          value={userDetails.Password}
          handleChange={handleChange}
        />
        <InputBox
          displayValue={"Confirm Password"}
          name="ConfirmPassword"
          value={userDetails.ConfirmPassword}
          handleChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "#5e43f3",
                },
              }}
              checked={userDetails.IsAdmin}
              onChange={handleAdminChange} 
            />
          }
          sx={{ color: "white" }}
          label="Make them an Admin?"
        />
        <CustomButton
          displayValue={"Create User"}
          displayIcon={<PersonAddIcon />}
          onClick={handleSubmit}
        />
      </Box>
    </Modal>
  );
};

export default AddUserModal;
