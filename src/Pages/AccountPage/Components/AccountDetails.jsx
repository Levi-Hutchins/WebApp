// AccountDetails.js
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import useCustomerDetails from "../Hooks/useCustomerDetails";
import useUpdateCustomerDetails from "../Hooks/useUpdateCustomerDetails";
import styles from '../Styles/Account.module.css';
import CustomButton from "../../../shared-components/Button/CustomButton";

const AccountDetails = ({ loggedInUser, setLoading }) => {
  const { userDetails } = useCustomerDetails(loggedInUser, setLoading);
  const { updateAccountDetails } = useUpdateCustomerDetails();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);

  useEffect(() => {
    setEditedDetails(userDetails);
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const toggleEdit = (field) => {
    if (field === "Name") {
      setIsEditingName((prev) => !prev);
    } else if (field === "Email") {
      setIsEditingEmail((prev) => !prev);
    }
  };

  const handleSave = async () => {
    const { Name, Email } = editedDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!Name) {
      toast.error("Name cannot be empty", { position: "bottom-right" });
      return;
    }

    if (!emailRegex.test(Email)) {
      toast.error("Please enter a valid email address", { position: "bottom-right" });
      return;
    }

    try {
      await updateAccountDetails([{ accountValue: "FullName", value: Name }, { accountValue: "EmailAddress", value: Email }], userDetails.ID);
      
      const loginData = JSON.parse(localStorage.getItem("LogInData"));
      if (loginData && loginData.EmailAddress) {
        loginData.EmailAddress = Email;
        localStorage.setItem("LogInData", JSON.stringify(loginData));
      }

      toast.success("Account details updated successfully", { position: "bottom-right" });
      setIsEditingName(false);
      setIsEditingEmail(false);
    } catch (error) {
      toast.error("Failed to update account details", { position: "bottom-right" });
    }
  };

  return (
    <div className={styles["panel"]}>
      <h2 style={{color: "white"}}>Account Details</h2>
      
      <TextField
        label="Name"
        name="Name"
        value={editedDetails.Name || ""}
        onChange={handleInputChange}
        disabled={!isEditingName}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CustomButton displayIcon={<EditIcon/>} onClick={() => toggleEdit("Name")}/>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#1c1c2b",
          input: { color: "#ffffff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#5e43f3" },
            "&:hover fieldset": { borderColor: "#5e43f3" },
            "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
          },
          "& .MuiInputLabel-root": { color: "#ffffff !important" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" }, 
        }}
      />
      
      <TextField
        label="Email"
        name="Email"
        value={editedDetails.Email || ""}
        onChange={handleInputChange}
        disabled={!isEditingEmail}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CustomButton displayIcon={<EditIcon/>} onClick={() => toggleEdit("Email")}/>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#1c1c2b",
          input: { color: "#ffffff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#5e43f3" },
            "&:hover fieldset": { borderColor: "#5e43f3" },
            "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
          },
          "& .MuiInputLabel-root": { color: "#ffffff !important" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff " }, 
        }}
      />

      {(isEditingName || isEditingEmail) && (
        <CustomButton
          onClick={handleSave}
          displayValue={"Save"}
          displayIcon={<SaveIcon/>}
        />
      )}
    </div>
  );
};

export default AccountDetails;
